var documenterSearchIndex = {"docs":
[{"location":"#[ParallelKMeans.jl-Package](https://github.com/PyDataBlog/ParallelKMeans.jl)-1","page":"Home","title":"ParallelKMeans.jl Package","text":"","category":"section"},{"location":"#Motivation-1","page":"Home","title":"Motivation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"It's actually a funny story that led to the development of this package. What started off as a personal toy project trying to re-construct the K-Means algorithm in native Julia blew up after a heated discussion on the Julia Discourse forum when I asked for Julia optimization tips. Long story short, the Julia community is an amazing one! Andrey offered his help and together, we decided to push the speed limits of Julia with a parallel implementation of the most famous clustering algorithm. The initial results were mind blowing so we have decided to tidy up the implementation and share with the world as a maintained Julia package.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Say hello to ParallelKMeans!","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This package aims to utilize the speed of Julia and parallelization (both CPU & GPU) to offer an extremely fast implementation of the K-Means clustering algorithm and its variants via a friendly interface for practioners.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"In short, we hope this package will eventually mature as the \"one-stop-shop\" for everything K-Means on CPUs and GPUs.","category":"page"},{"location":"#K-Means-Algorithm-Implementation-Notes-1","page":"Home","title":"K-Means Algorithm Implementation Notes","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Since Julia is a column major language, the input (design matrix) expected by the package must be in the following format;","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Design matrix X of size n×m, the i-th column of X (X[:, i]) is a single data point in n-dimensional space.\nThus, the rows of the design matrix represent the feature space with the columns representing all the training samples in this feature space.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"One of the pitfalls of K-Means algorithm is that it can fall into a local minima. This implementation inherits this problem like every implementation does. As a result, it is useful in practice to restart it several times to get the correct results.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"You can grab the latest stable version of this package from Julia registries by simply running;","category":"page"},{"location":"#","page":"Home","title":"Home","text":"NB: Don't forget to invoke Julia's package manager with ]","category":"page"},{"location":"#","page":"Home","title":"Home","text":"pkg> add ParallelKMeans","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The few (and selected) brave ones can simply grab the current experimental features by simply adding the experimental branch to your development environment after invoking the package manager with ]:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"dev git@github.com:PyDataBlog/ParallelKMeans.jl.git","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Don't forget to checkout the experimental branch and you are good to go with bleeding edge features and breakages!","category":"page"},{"location":"#","page":"Home","title":"Home","text":"git checkout experimental","category":"page"},{"location":"#Features-1","page":"Home","title":"Features","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Lightning fast implementation of Kmeans clustering algorithm even on a single thread in native Julia.\nSupport for multi-threading implementation of K-Means clustering algorithm.\n'Kmeans++' initialization for faster and better convergence.\nImplementation of available classic and contemporary variants of the K-Means algorithm.","category":"page"},{"location":"#Pending-Features-1","page":"Home","title":"Pending Features","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"[X] Implementation of Hamerly implementation.\n[X] Interface for inclusion in Alan Turing Institute's MLJModels.\n[X] Full Implementation of Triangle inequality based on Elkan - 2003 Using the Triangle Inequality to Accelerate K-Means\".\n[ ] Implementation of Geometric methods to accelerate k-means algorithm.\n[ ] Support for other distance metrics supported by Distances.jl.\n[ ] Native support for tabular data inputs outside of MLJModels' interface.\n[ ] Refactoring and finalizaiton of API desgin.\n[ ] GPU support.\n[ ] Implementation of other K-Means algorithm variants based on recent literature.\n[ ] Optimization of code base.\n[ ] Improved Documentation\n[ ] More benchmark tests.","category":"page"},{"location":"#How-To-Use-1","page":"Home","title":"How To Use","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Taking advantage of Julia's brilliant multiple dispatch system, the package exposes users to a very easy-to-use API.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using ParallelKMeans\n\n# Uses all available CPU cores by default\nmulti_results = kmeans(X, 3; max_iters=300)\n\n# Use only 1 core of CPU\nresults = kmeans(X, 3; n_threads=1, max_iters=300)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The main design goal is to offer all available variations of the KMeans algorithm to end users as composable elements. By default, Lloyd's implementation is used but users can specify different variations of the KMeans clustering algorithm via this interface;","category":"page"},{"location":"#","page":"Home","title":"Home","text":"some_results = kmeans([algo], input_matrix, k; kwargs)\n\n# example\nr = kmeans(Lloyd(), X, 3)  # same result as the default","category":"page"},{"location":"#","page":"Home","title":"Home","text":"# r contains all the learned artifacts that can be accessed as;\nr.centers               # cluster centers (d x k)\nr.assignments           # label assignments (n)\nr.totalcost             # total cost (i.e. objective)\nr.iterations            # number of elapsed iterations\nr.converged             # whether the procedure converged","category":"page"},{"location":"#Supported-KMeans-algorithm-variations-1","page":"Home","title":"Supported KMeans algorithm variations","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Lloyd()\nHamerly()\nElkan()\nGeometric() - (Coming soon)\nMiniBatch() - (Coming soon)","category":"page"},{"location":"#Practical-Usage-Examples-1","page":"Home","title":"Practical Usage Examples","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Some of the common usage examples of this package are as follows:","category":"page"},{"location":"#Clustering-With-A-Desired-Number-Of-Groups-1","page":"Home","title":"Clustering With A Desired Number Of Groups","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using ParallelKMeans, RDatasets, Plots\n\n# load the data\niris = dataset(\"datasets\", \"iris\");\n\n# features to use for clustering\nfeatures = collect(Matrix(iris[:, 1:4])');\n\n# various artifacts can be accessed from the result i.e. assigned labels, cost value etc\nresult = kmeans(features, 3);\n\n# plot with the point color mapped to the assigned cluster index\nscatter(iris.PetalLength, iris.PetalWidth, marker_z=result.assignments,\n        color=:lightrainbow, legend=false)\n","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: Image description)","category":"page"},{"location":"#Elbow-Method-For-The-Selection-Of-optimal-number-of-clusters-1","page":"Home","title":"Elbow Method For The Selection Of optimal number of clusters","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using ParallelKMeans\n\n# Single Thread Implementation of Lloyd's Algorithm\nb = [ParallelKMeans.kmeans(X, i, n_threads=1; tol=1e-6, max_iters=300, verbose=false).totalcost for i = 2:10]\n\n# Multi-threaded Implementation of Lloyd's Algorithm by default\nc = [ParallelKMeans.kmeans(X, i; tol=1e-6, max_iters=300, verbose=false).totalcost for i = 2:10]\n","category":"page"},{"location":"#Benchmarks-1","page":"Home","title":"Benchmarks","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Currently, this package is benchmarked against similar implementations in both Python and Julia. All reproducible benchmarks can be found in ParallelKMeans/extras directory. More tests in various languages are planned beyond the initial release version (0.1.0).","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Note: All benchmark tests are made on the same computer to help eliminate any bias.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Currently, the benchmark speed tests are based on the search for optimal number of clusters using the Elbow Method since this is a practical use case for most practioners employing the K-Means algorithm.","category":"page"},{"location":"#Benchmark-Results-1","page":"Home","title":"Benchmark Results","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: benchmark_image.png)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"_________________________________________________________________________________________________________","category":"page"},{"location":"#","page":"Home","title":"Home","text":"1 million (ms) 100k (ms) 10k (ms) 1k (ms) package language\n666840 34034 709.049 17.686 Clustering.jl Julia\n21730 2975 163.771 6.444 ParallelKMeans Lloyd Julia\n11784 1339 94.233 6.6 ParallelKMeans Hamerly Julia\n17591 1074 81.995 6.953 ParallelKMeans Elkan Julia\n1430000 146000 5770 344 Sklearn Kmeans Python\n30100 3750 613 201 Sklearn MiniBatchKmeans Python\n218200 15510 733.7 19.47 Knor R","category":"page"},{"location":"#","page":"Home","title":"Home","text":"_________________________________________________________________________________________________________","category":"page"},{"location":"#Release-History-1","page":"Home","title":"Release History","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"0.1.0 Initial release.\n0.1.1 Added interface for MLJ.\n0.1.2 Added Elkan algorithm.\n0.1.3 Faster & optimized execution.","category":"page"},{"location":"#Contributing-1","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Ultimately, we see this package as potentially the one-stop-shop for everything related to KMeans algorithm and its speed up variants. We are open to new implementations and ideas from anyone interested in this project.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Detailed contribution guidelines will be added in upcoming releases.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"<!–- TODO: Contribution Guidelines –->","category":"page"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Modules = [ParallelKMeans]","category":"page"},{"location":"#ParallelKMeans.Elkan","page":"Home","title":"ParallelKMeans.Elkan","text":"Elkan()\n\nElkan algorithm implementation, based on \"Charles Elkan. 2003. Using the triangle inequality to accelerate k-means. In Proceedings of the Twentieth International Conference on International Conference on Machine Learning (ICML’03). AAAI Press, 147–153.\"\n\nThis algorithm provides much faster convergence than Lloyd algorithm especially for high dimensional data. It can be used directly in kmeans function\n\nX = rand(30, 100_000)   # 100_000 random points in 30 dimensions\n\nkmeans(Elkan(), X, 3) # 3 clusters, Elkan algorithm\n\n\n\n\n\n","category":"type"},{"location":"#ParallelKMeans.Hamerly","page":"Home","title":"ParallelKMeans.Hamerly","text":"Hamerly()\n\nHamerly algorithm implementation, based on \"Hamerly, Greg. (2010). Making k-means Even Faster.  Proceedings of the 2010 SIAM International Conference on Data Mining. 130-140. 10.1137/1.9781611972801.12.\"\n\nThis algorithm provides much faster convergence than Lloyd algorithm with realtively small increase in memory footprint. It is especially suitable for low to medium dimensional input data.\n\nIt can be used directly in kmeans function\n\nX = rand(30, 100_000)   # 100_000 random points in 30 dimensions\n\nkmeans(Hamerly(), X, 3) # 3 clusters, Hamerly algorithm\n\n\n\n\n\n","category":"type"},{"location":"#ParallelKMeans.Lloyd","page":"Home","title":"ParallelKMeans.Lloyd","text":"Lloyd <: AbstractKMeansAlg\n\nBasic algorithm for k-means calculation.\n\n\n\n\n\n","category":"type"},{"location":"#ParallelKMeans.kmeans-Tuple{Any,Any,Any}","page":"Home","title":"ParallelKMeans.kmeans","text":"Kmeans([alg::AbstractKMeansAlg,] design_matrix, k; n_threads = nthreads(), k_init=\"k-means++\", max_iters=300, tol=1e-6, verbose=true)\n\nThis main function employs the K-means algorithm to cluster all examples in the training data (design_matrix) into k groups using either the k-means++ or random initialisation technique for selecting the initial centroids.\n\nAt the end of the number of iterations specified (max_iters), convergence is achieved if difference between the current and last cost objective is less than the tolerance level (tol). An error is thrown if convergence fails.\n\nArguments:\n\nalg defines one of the algorithms used to calculate k-means. This\n\nargument can be omitted, by default Lloyd algorithm is used.\n\nn_threads defines number of threads used for calculations, by default it is equal\n\nto the Threads.nthreads() which is defined by JULIA_NUM_THREADS environmental variable. For small size design matrices it make sense to set this argument to 1 in order to avoid overhead of threads generation.\n\nk_init is one of the algorithms used for initialization. By default k-means++ algorithm is used,\n\nalternatively one can use rand to choose random points for init.\n\nmax_iters is the maximum number of iterations\ntol defines tolerance for early stopping.\nverbose is verbosity level. Details of operations can be either printed or not by setting verbose accordingly.\n\nA KmeansResult structure representing labels, centroids, and sum_squares is returned.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.AbstractKMeansAlg","page":"Home","title":"ParallelKMeans.AbstractKMeansAlg","text":"AbstractKMeansAlg\n\nAbstract base type inherited by all sub-KMeans algorithms.\n\n\n\n\n\n","category":"type"},{"location":"#ParallelKMeans.ClusteringResult","page":"Home","title":"ParallelKMeans.ClusteringResult","text":"ClusteringResult\n\nBase type for the output of clustering algorithm.\n\n\n\n\n\n","category":"type"},{"location":"#ParallelKMeans.KmeansResult","page":"Home","title":"ParallelKMeans.KmeansResult","text":"KmeansResult{C,D<:Real,WC<:Real} <: ClusteringResult\n\nThe output of kmeans and kmeans!.\n\nType parameters\n\nC<:AbstractMatrix{<:AbstractFloat}: type of the centers matrix\nD<:Real: type of the assignment cost\nWC<:Real: type of the cluster weight\n\nC is the type of centers, an (abstract) matrix of size (d x k)\n\nD is the type of pairwise distance computation from points to cluster centers\n\nWC is the type of cluster weights, either Int (in the case where points are\n\nunweighted) or eltype(weights) (in the case where points are weighted).\n\n\n\n\n\n","category":"type"},{"location":"#MLJModelInterface.fit-Tuple{ParallelKMeans.KMeans,Int64,Any}","page":"Home","title":"MLJModelInterface.fit","text":"Fit the specified ParaKMeans model constructed by the user.\n\nSee also the [package documentation](https://pydatablog.github.io/ParallelKMeans.jl/stable).\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.chunk_colwise!-NTuple{4,Any}","page":"Home","title":"ParallelKMeans.chunk_colwise!","text":"chunk_colwise!(target, x, y, r)\n\nUtility function for calculation of the colwise!(target, x, y, n_threads) function. UnitRange argument r select subarray of original design matrix x that is going to be processed.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.chunk_initialize-Tuple{Hamerly,Any,Any,Any,Any,Any}","page":"Home","title":"ParallelKMeans.chunk_initialize","text":"chunk_initialize(alg::Hamerly, containers, centroids, design_matrix, r, idx)\n\nInitial calulation of all bounds and points labeling.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.chunk_update_bounds-Tuple{Hamerly,Any,Any,Any,Any,Any,Any,Any}","page":"Home","title":"ParallelKMeans.chunk_update_bounds","text":"chunk_update_bounds(alg::Hamerly, containers, r1, r2, pr1, pr2, r, idx)\n\nUpdates upper and lower bounds of point distance to the centers, with regard to the centers movement.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.chunk_update_centroids-Tuple{Hamerly,Any,Any,Any,Any,Any}","page":"Home","title":"ParallelKMeans.chunk_update_centroids","text":"chunk_update_centroids(::Hamerly, containers, centroids, X, r, idx)\n\nDetailed description of this function can be found in the original paper. It iterates through all points and tries to skip some calculation using known upper and lower bounds of distances from point to centers. If it fails to skip than it fall back to generic point_all_centers! function.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.colwise!","page":"Home","title":"ParallelKMeans.colwise!","text":"colwise!(target, x, y, n_threads)\n\nInternal function for colwise calculations. Let x is a matrix m x n and y is a vector of the length m. Then the colwise! function computes distance between each column in x and y and store result in target array. Argument n_threads defines the number of threads used for calculation.\n\n\n\n\n\n","category":"function"},{"location":"#ParallelKMeans.create_containers-Tuple{Lloyd,Any,Any,Any,Any}","page":"Home","title":"ParallelKMeans.create_containers","text":"create_containers(::Lloyd, k, nrow, ncol, n_threads)\n\nInternal function for the creation of all necessary intermidiate structures.\n\ncentroids_new - container which holds new positions of centroids\ncentroids_cnt - container which holds number of points for each centroid\nlabels - vector which holds labels of corresponding points\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.distance-NTuple{4,Any}","page":"Home","title":"ParallelKMeans.distance","text":"distance(X1, X2, i1, i2)\n\nAllocationless calculation of square eucledean distance between vectors X1[:, i1] and X2[:, i2]\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.double_argmax-Tuple{Any}","page":"Home","title":"ParallelKMeans.double_argmax","text":"double_argmax(p)\n\nFinds maximum and next after maximum arguments.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.kmeans!-Tuple{Lloyd,Any,Any,Any}","page":"Home","title":"ParallelKMeans.kmeans!","text":"Kmeans!(alg::AbstractKMeansAlg, containers, design_matrix, k; n_threads = nthreads(), k_init=\"k-means++\", max_iters=300, tol=1e-6, verbose=true)\n\nMutable version of kmeans function. Definition of arguments and results can be found in kmeans.\n\nArgument containers represent algorithm specific containers, such as labels, intermidiate centroids and so on, which are used during calculations.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.move_centers-Tuple{Hamerly,Any,Any}","page":"Home","title":"ParallelKMeans.move_centers","text":"move_centers(::Hamerly, containers, centroids)\n\nCalculates new positions of centers and distance they have moved. Results are stored in centroids and p respectively.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.point_all_centers!-NTuple{4,Any}","page":"Home","title":"ParallelKMeans.point_all_centers!","text":"point_all_centers!(containers, centroids, X, i)\n\nCalculates new labels and upper and lower bounds for all points.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.smart_init","page":"Home","title":"ParallelKMeans.smart_init","text":"smart_init(X, k; init=\"k-means++\")\n\nThis function handles the random initialisation of the centroids from the design matrix (X) and desired groups (k) that a user supplies.\n\nk-means++ algorithm is used by default with the normal random selection of centroids from X used if any other string is attempted.\n\nA named tuple representing centroids and indices respecitively is returned.\n\n\n\n\n\n","category":"function"},{"location":"#ParallelKMeans.splitter-Tuple{Any,Any}","page":"Home","title":"ParallelKMeans.splitter","text":"spliiter(n, k)\n\nInternal utility function, splits 1:n sequence to k chunks of approximately same size.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.sum_of_squares-NTuple{6,Any}","page":"Home","title":"ParallelKMeans.sum_of_squares","text":"sum_of_squares(x, labels, centre, k)\n\nThis function computes the total sum of squares based on the assigned (labels) design matrix(x), centroids (centre), and the number of desired groups (k).\n\nA Float type representing the computed metric is returned.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.update_containers-Tuple{Hamerly,Any,Any,Any}","page":"Home","title":"ParallelKMeans.update_containers","text":"update_containers(::Hamerly, containers, centroids, n_threads)\n\nCalculates minimum distances from centers to each other.\n\n\n\n\n\n","category":"method"},{"location":"#ParallelKMeans.@parallelize-Tuple{Any,Any,Any}","page":"Home","title":"ParallelKMeans.@parallelize","text":"@parallelize(n_threads, ncol, f)\n\nParallelize function and run it over n_threads. Function should require following conditions:\n\nIt should not return any values.\nIt should accept parameters two parameters at the end of the argument list. First\n\naccepted parameter is range, which defines chunk used in calculations. Second parameter is idx which defines id of the container where results can be stored.\n\nncol argument defines range 1:ncol which is sliced in n_threads chunks.\n\n\n\n\n\n","category":"macro"}]
}
