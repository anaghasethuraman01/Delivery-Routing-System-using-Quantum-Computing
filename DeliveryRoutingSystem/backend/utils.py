import numpy as np
import math
import operator
import matplotlib.pyplot as plt
from geopy.geocoders import Nominatim
#cplex
import cplex
from cplex.exceptions import CplexError
# Qiskit packages
from qiskit import BasicAer
from qiskit.utils import QuantumInstance, algorithm_globals
from qiskit.algorithms import NumPyMinimumEigensolver, QAOA
from qiskit.algorithms.optimizers import SPSA
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms import MinimumEigenOptimizer

def getRandomNodesFromDb(n):
    nodeMap = {}
    addresses = ['Los Angeles', 'Sacramento', 'Charlotte']
    geolocator = Nominatim(user_agent="VRP Using QC")
    xc = np.zeros([n])
    yc = np.zeros([n])
    for i in range(0, n):
        location = geolocator.geocode(addresses[i])
        nodeMap[i] = addresses[i]
        xc[i] = location.latitude
        yc[i] = location.longitude
    
    instance = np.zeros([n, n])
    for ii in range(0, n):
        for jj in range(ii + 1, n):
            instance[ii, jj] = math.sqrt((xc[ii] - xc[jj]) ** 2 + (yc[ii] - yc[jj]) ** 2)
            instance[jj, ii] = instance[ii, jj]

    print('Input nodes:\n',instance)

    return xc, yc, instance, nodeMap
    
def cplex_solution(n,K,instance):
    # refactoring
    my_obj = list(instance.reshape(1, n**2)[0])+[0. for x in range(0,n-1)]
    my_ub = [1 for x in range(0,n**2+n-1)]
    my_lb = [0 for x in range(0,n**2)] + [0.1 for x in range(0,n-1)]
    my_ctype = "".join(['I' for x in range(0,n**2)]) + "".join(['C' for x in range(0,n-1)])

    my_rhs = 2*([K] + [1 for x in range(0,n-1)]) + [1-0.1 for x in range(0,(n-1)**2-(n-1))] + [0 for x in range(0,n)]
    my_sense = "".join(['E' for x in range(0,2*n)]) + "".join(['L' for x in range(0,(n-1)**2-(n-1))])+"".join(['E' for x in range(0,n)])

    try:
        my_prob = cplex.Cplex()
        populatebyrow(n,my_prob,my_obj,my_ub,my_lb,my_ctype,my_sense,my_rhs)

        my_prob.solve()

    except CplexError as exc:
        print('Encountered error in cplex:',exc)
        return

    x = my_prob.solution.get_values()
    x = np.array(x)
    cost = my_prob.solution.get_objective_value()

    return x,cost


def populatebyrow(n,prob,my_obj,my_ub,my_lb,my_ctype,my_sense,my_rhs):
    prob.objective.set_sense(prob.objective.sense.minimize)
    prob.variables.add(obj = my_obj, lb = my_lb, ub = my_ub, types = my_ctype)

    prob.set_log_stream(None)
    prob.set_error_stream(None)
    prob.set_warning_stream(None)
    prob.set_results_stream(None)

    rows = []
    for ii in range(0,n):
        col = [x for x in range(0+n*ii,n+n*ii)]
        coef = [1 for x in range(0,n)]
        rows.append([col, coef])

    for ii in range(0,n):
        col = [x for x in range(0+ii,n**2,n)]
        coef = [1 for x in range(0,n)]

        rows.append([col, coef])

    # Sub-tour elimination constraints:
    for ii in range(0, n):
        for jj in range(0,n):
            if (ii != jj)and(ii*jj>0):

                col = [ii+(jj*n), n**2+ii-1, n**2+jj-1]
                coef = [1, 1, -1]

                rows.append([col, coef])

    for ii in range(0,n):
        col = [(ii)*(n+1)]
        coef = [1]
        rows.append([col, coef])

    prob.linear_constraints.add(lin_expr=rows, senses=my_sense, rhs=my_rhs)

def binary_representation(n,K,instance, x_sol=0):
    A = np.max(instance) * 100  # A parameter of cost function

    # Determine the weights w
    instance_vec = instance.reshape(n ** 2)
    w_list = [instance_vec[x] for x in range(n ** 2) if instance_vec[x] > 0]
    w = np.zeros(n * (n - 1))
    for ii in range(len(w_list)):
        w[ii] = w_list[ii]

    # Some variables I will use
    Id_n = np.eye(n)
    Im_n_1 = np.ones([n - 1, n - 1])
    Iv_n_1 = np.ones(n)
    Iv_n_1[0] = 0
    Iv_n = np.ones(n - 1)
    neg_Iv_n_1 = np.ones(n) - Iv_n_1

    v = np.zeros([n, n * (n - 1)])
    for ii in range(n):
        count = ii - 1
        for jj in range(n * (n - 1)):

            if jj // (n - 1) == ii:
                count = ii

            if jj // (n - 1) != ii and jj % (n - 1) == count:
                v[ii][jj] = 1.0

    vn = np.sum(v[1:], axis=0)

    # Q defines the interactions between variables
    Q = A * (np.kron(Id_n, Im_n_1) + np.dot(v.T, v))

    # g defines the contribution from the individual variables
    g = (
        w
        - 2 * A * (np.kron(Iv_n_1, Iv_n) + vn.T)
        - 2 * A * K * (np.kron(neg_Iv_n_1, Iv_n) + v[0].T)
    )

    # c is the constant offset
    c = 2 * A * (n - 1) + 2 * A * (K ** 2)

    try:
        max(x_sol)
        # Evaluates the cost distance from a binary representation of a path
        fun = (
            lambda x: np.dot(np.around(x), np.dot(Q, np.around(x)))
            + np.dot(g, np.around(x))
            + c
        )
        cost = fun(x_sol)
    except:
        cost = 0

    return Q, g, c, cost



def construct_problem(Q, g, c) -> QuadraticProgram:
    qp = QuadraticProgram()
    for i in range(n * (n - 1)):
        qp.binary_var(str(i))
    qp.objective.quadratic = Q
    qp.objective.linear = g
    qp.objective.constant = c
    qp.objective.num_qubits=12
    return qp

def solve_problem(qp):
    algorithm_globals.random_seed = 10598
    quantum_instance = QuantumInstance(
        BasicAer.get_backend("qasm_simulator"),
        seed_simulator=algorithm_globals.random_seed,
        seed_transpiler=algorithm_globals.random_seed,
    )

    qaoa = QAOA(quantum_instance=quantum_instance)
    optimizer = MinimumEigenOptimizer(min_eigen_solver=qaoa)
    result = optimizer.solve(qp)
    # compute cost of the obtained result
    _, _, _, level = binary_representation(x_sol=result.x)
    return result, level, qaoa

def checkBinaryRepresentation(z):
    # Check if the binary representation is correct
    try:
        if z is not None:
            Q, g, c, binary_cost = binary_representation(x_sol=z)
            print("Binary cost:", binary_cost, "classical cost:", classical_cost)
            if np.abs(binary_cost - classical_cost) < 0.01:
                print("Binary formulation is correct")
            else:
                print("Error in the binary formulation")
        else:
            print("Could not verify the correctness, due to CPLEX solution being unavailable.")
            Q, g, c, binary_cost = quantum_optimizer.binary_representation()
            print("Binary cost:", binary_cost)
    except NameError as e:
        print("Warning: Please run the cells above first.")
        print(e)

def visualize_solution(xc, yc, x, C, n, K, title_str, nodeMap):
    plt.figure()
    plt.scatter(xc, yc, s=200)
    for i in range(len(xc)):
        plt.annotate(nodeMap[i], (xc[i] + 0.15, yc[i]), size=16, color='r')
    plt.plot(xc[0], yc[0], 'r*', ms=20)

    plt.grid()

    for ii in range(0, n ** 2):

        if x[ii] > 0:
            ix = ii // n
            iy = ii % n
            plt.arrow(xc[ix], yc[ix], xc[iy] - xc[ix], yc[iy] - yc[ix], length_includes_head=True, head_width=.25)

    plt.title(title_str+' cost = ' + str(int(C * 100) / 100.))
    plt.show()

def vqe(n,k,nodes):
    print('**********************vqe implementation**********************')
    # Solve the problem in a classical fashion via CPLEX
    x = None
    z = None
    try:
        x,classical_cost = cplex_solution()
        # Put the solution in the z variable
        z = [x[ii] for ii in range(n**2) if ii//n != ii%n]
        # Print the solution
        print(z)
    except:
        print("CPLEX may be missing.")
    
    xc, yc, instance = initializer.generate_instance()


def qaoa(n,k,nodes):
    print('qaoa implementation')

def admm(n,k,nodes):
    print('admm implementation')

def classical(n,k):
    print('**********************classical implementation**********************')
    xc, yc, instance, nodeMap = getRandomNodesFromDb(n)
    # Solve the problem in a classical fashion via CPLEX
    x = None
    z = None
    try:
        x,classical_cost = cplex_solution(n,k,instance)

        # Put the solution in the z variable
        z = [x[ii] for ii in range(n**2) if ii//n != ii%n]
        # Print the solution
        print(z)
    except:
        print("CPLEX may be missing.")
    if x is not None:
        visualize_solution(xc, yc, x, classical_cost, n, k, 'Classical', nodeMap)

classical(3,1)