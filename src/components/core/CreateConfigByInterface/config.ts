/**
 * Constant Select Values
 */
export const types = ["Problem", "Optimization", "Evaluation"] as const;
export const advancedSettingTypes = [
  "Surrogate",
  "Acquisition",
  "Solver",
  "Selection",
] as const;
export const initialTypes = ["Radom", "From file"] as const;
export const problems = [
  "VLMOP2",
  "VLMOP3",
  "OKA1",
  "OKA2",
  "Ackley2D",
  "Ackley5D",
  "Ackley10D",
  "ZDT1",
  "ZDT2",
  "ZDT3",
  "ZDT4",
  "RE1",
  "RE2",
  "RE3",
  "RE4",
  "RE5",
  "RE6",
  "RE7",
  "DTLZ1",
  "DTLZ2",
  "DTLZ3",
  "DTLZ4",
  "DTLZ5",
  "DTLZ6",
] as const;
export const algorithmSpec = {
  dgemo: {
    surrogate: "gp",
    acquisition: "identity",
    solver: "discovery",
    selection: "direct",
  },
  tsemo: {
    surrogate: "gp",
    acquisition: "ts",
    solver: "nsga2",
    selection: "hvi",
  },
  "usemo-ei": {
    surrogate: "gp",
    acquisition: "ei",
    solver: "nsga2",
    selection: "uncertainty",
  },
  "moead-ego": {
    surrogate: "gp",
    acquisition: "ei",
    solver: "moead",
    selection: "direct",
  },
  parego: {
    surrogate: "gp",
    acquisition: "ei",
    solver: "parego",
    selection: "direct",
  },
  custom: {
    surrogate: "",
    acquisition: "",
    solver: "",
    selection: "",
  },
};
export const asynchronousStrategys = [
  "None",
  "Kriging Believer",
  "Local Penalizer",
  "Believer Penalizer",
] as const;
export const surrogateNames = [
  "GaussianProcess",
  "NeuralNetwork",
  "BayesianNeuralNetwork",
] as const;
export const acquisitionNames = [
  {
    label: "ExpectedImprovement",
    value: "ei",
  },
  {
    label: "Identity",
    value: "identity",
  },
  {
    label: "ProbabilityOfImprovement",
    value: "pi",
  },
  {
    label: "ThompsonSampling",
    value: "ts",
  },
  {
    label: "UpperConfidenceBound",
    value: "ucb",
  },
];
export const solverNames = [
  {
    label: "NSGA-II",
    value: "nsga2",
  },
  {
    label: "MOEA/D",
    value: "moead",
  },
  {
    label: "ParEGO",
    value: "parego",
  },
  {
    label: "ParetoFrontDiscovery",
    value: "discovery",
  },
  {
    label: "Genetic Algorithm",
    value: "ga",
  },
  {
    label: "CMA-ES",
    value: "cmaes",
  },
];
export const selectionNames = [
  { label: "Direct", value: "direct" },
  { label: "HypervolumeImprovement", value: "hvi" },
  { label: "Random", value: "random" },
  { label: "Uncertainty", value: "uncertainty" },
];

export type TypeUnion = (typeof types)[number];
export type AdvancedSettingTypeUnion = (typeof advancedSettingTypes)[number];
export type InitialTypeUnion = (typeof initialTypes)[number];
export type ProblemUnion = (typeof problems)[number];
export type AsynchronousStrategyUnion = (typeof asynchronousStrategys)[number];
export type SurrogateTypeUnion = (typeof surrogateNames)[number];
export type AcquisitionTypeUnion = (typeof acquisitionNames)[number];
export type SolverTypeUnion = (typeof solverNames)[number];
export type SelectionTypeUnion = (typeof selectionNames)[number];

export interface UserInterfaceForm {
  /**
   * base settings
   */
  type: TypeUnion;
  experimentName: string;
  algorithmName: string;
  problemName: string;
  initialzation: InitialTypeUnion;
  asynchronousStrategy: AsynchronousStrategyUnion;
  n_init_sample: number;
  processes: number;
  evaluationWorkers: number;

  /**
   * advanced settings
   */
  advancedSettingType: AdvancedSettingTypeUnion;
  surrogate: {
    surrogate: string;
    nu: number; //default 1
  };
  acquisition: {
    acquisition: string;
    n_spectral_pts: number; //default 100
    meanSample: boolean; // default false
  };
  solver: {
    solver: string;
    n_gen: number; //default 200
    pop_size: number; //default 200
  };
  selection: {
    selection: string;
  };
}

export const transfromConfig: Record<TypeUnion, (keyof UserInterfaceForm)[]> = {
  Problem: ["problemName", "n_init_sample", "initialzation", "experimentName"],
  Optimization: [
    "algorithmName",
    "asynchronousStrategy",
    "processes",
    "experimentName",
  ],
  Evaluation: ["evaluationWorkers", "experimentName"],
};
