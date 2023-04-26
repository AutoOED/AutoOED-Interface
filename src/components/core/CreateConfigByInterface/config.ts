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
export const algorithms = [
  "dgemo",
  "tsemo",
  "usemo-ei",
  "moead-ego",
  "parego",
  "custom",
] as const;
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
  "ExpectedImprovement",
  "Identity",
  "ProbabilityOfImprovement",
  "ThompsonSampling",
  "UpperConfidenceBound",
] as const;
export const solverNames = [
  "NSGA-II",
  "MOEA/D",
  "ParEGO",
  "ParetoDiscovery",
  "Genetic Algorithm",
  "CMA-ES",
] as const;
export const selectionNames = [
  "Direct",
  "HypervolumeImprovement",
  "Random",
  "Uncertainty",
] as const;

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
  samples: number;
  processes: number;
  evaluationWorkers: number;

  /**
   * advanced settings
   */
  advancedSettingType: AdvancedSettingTypeUnion;
  surrogateName: SurrogateTypeUnion;
  acquisitionName: AcquisitionTypeUnion;
  solverName: SolverTypeUnion;
  selectionName: SelectionTypeUnion;
  meanSample: boolean; // default false
  nu: number; //default 1
  n_spectral_pts: number; //default 100
  n_gen: number; //default 200
  pop_size: number; //default 200
}

export const transfromConfig: Record<TypeUnion, (keyof UserInterfaceForm)[]> = {
  Problem: ["problemName", "samples", "initialzation", "experimentName"],
  Optimization: [
    "algorithmName",
    "asynchronousStrategy",
    "processes",
    "experimentName",
  ],
  Evaluation: ["evaluationWorkers", "experimentName"],
};
