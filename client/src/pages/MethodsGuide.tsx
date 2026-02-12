import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function MethodsGuide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4">Methodological Guide</Badge>
          <h1 className="text-4xl font-bold mb-4">
            Choosing the Right Statistical Method
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding when to use Propensity Score Matching vs Logistic Regression in sports research
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decision">Decision Tool</TabsTrigger>
            <TabsTrigger value="psm">When PSM Works</TabsTrigger>
            <TabsTrigger value="logistic">When Logistic Works</TabsTrigger>
            <TabsTrigger value="case-study">Our Case Study</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">The Core Question</h2>
              <p className="text-lg leading-relaxed mb-6">
                The choice between Propensity Score Matching (PSM) and Logistic Regression depends on one fundamental question:
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
                <p className="text-xl font-semibold text-primary">
                  Are you trying to predict an outcome, or estimate a causal effect?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Prediction Questions</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        "What factors are associated with the outcome?"
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>Which performance metrics predict selection?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>How well can we forecast player success?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>What characteristics identify high performers?</span>
                        </li>
                      </ul>
                      <div className="mt-4 pt-4 border-t">
                        <p className="font-semibold text-emerald-700">→ Use Logistic Regression</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-blue-200 bg-blue-50/50">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Causal Questions</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        "What is the effect of an intervention?"
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Does injury reduce career longevity?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Does early draft position improve development?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Does training intervention increase performance?</span>
                        </li>
                      </ul>
                      <div className="mt-4 pt-4 border-t">
                        <p className="font-semibold text-blue-700">→ Consider PSM (if data structure allows)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            <Card className="p-8 bg-amber-50/50 border-amber-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                The Critical PSM Requirement
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                PSM requires that <strong>the outcome must be observable for both treated and control groups</strong>. 
                This is not just a data quality issue—it's a fundamental structural requirement.
              </p>
              <div className="bg-white p-4 rounded-lg border border-amber-300">
                <p className="font-mono text-sm mb-2">
                  <strong>Example:</strong> Measuring AFL performance
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Selected players:</strong> AFL performance is observable ✓</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Non-selected players:</strong> AFL performance is <em>structurally impossible</em> to observe ✗</span>
                  </div>
                </div>
                <p className="mt-3 text-amber-800 font-semibold">
                  → PSM cannot be used when the outcome only exists for one group
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Decision Tool Tab */}
          <TabsContent value="decision" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Interactive Decision Tree</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-bold text-lg mb-3">Step 1: What is your research question?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 hover:border-emerald-500 cursor-pointer transition-colors">
                      <p className="font-semibold mb-2">Prediction / Association</p>
                      <p className="text-sm text-muted-foreground">
                        "What factors predict outcome Y?"<br/>
                        "Which X variables are associated with Y?"
                      </p>
                      <p className="text-emerald-600 font-semibold mt-3">→ Go to Step 2A</p>
                    </Card>
                    <Card className="p-4 hover:border-blue-500 cursor-pointer transition-colors">
                      <p className="font-semibold mb-2">Causal Effect</p>
                      <p className="text-sm text-muted-foreground">
                        "Does treatment T cause outcome Y?"<br/>
                        "What would happen if we intervened on X?"
                      </p>
                      <p className="text-blue-600 font-semibold mt-3">→ Go to Step 2B</p>
                    </Card>
                  </div>
                </div>

                {/* Step 2A - Prediction Path */}
                <div className="border-l-4 border-emerald-500 pl-6 bg-emerald-50/30 py-4">
                  <h3 className="font-bold text-lg mb-3">Step 2A: For Prediction Questions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Is your outcome binary (yes/no)?</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Examples: Selected/Not Selected, Win/Loss, Injured/Healthy
                        </p>
                        <p className="text-emerald-700 font-semibold mt-2">
                          ✓ Use <strong>Logistic Regression</strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Is your outcome continuous?</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Examples: Points scored, Career length, Performance rating
                        </p>
                        <p className="text-emerald-700 font-semibold mt-2">
                          ✓ Use <strong>Linear Regression</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2B - Causal Path */}
                <div className="border-l-4 border-blue-500 pl-6 bg-blue-50/30 py-4">
                  <h3 className="font-bold text-lg mb-3">Step 2B: For Causal Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Check these requirements:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <span className="text-sm">
                            <strong>Outcome exists for both groups:</strong> Can you measure Y for both treated and control units?
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <span className="text-sm">
                            <strong>Treatment is binary or can be dichotomized:</strong> Clear treatment/control distinction
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <span className="text-sm">
                            <strong>Pre-treatment covariates available:</strong> Variables measured before treatment
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <span className="text-sm">
                            <strong>Common support:</strong> Overlap in characteristics between groups
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-300">
                      <p className="font-semibold mb-2">If ALL boxes checked:</p>
                      <p className="text-blue-700 font-semibold">
                        ✓ PSM may be appropriate (also consider regression adjustment, instrumental variables, or difference-in-differences)
                      </p>
                      <p className="font-semibold mt-3 mb-2">If ANY box unchecked:</p>
                      <p className="text-red-700 font-semibold">
                        ✗ PSM is not appropriate. Consider alternative methods or reframe as prediction question.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-8">
                  <h3 className="font-bold text-xl mb-4">Quick Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left">Criterion</th>
                          <th className="border p-3 text-left">Logistic Regression</th>
                          <th className="border p-3 text-left">PSM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3 font-semibold">Primary Use</td>
                          <td className="border p-3 bg-emerald-50">Prediction & Association</td>
                          <td className="border p-3 bg-blue-50">Causal Inference</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold">Outcome Requirement</td>
                          <td className="border p-3">Observable for all units</td>
                          <td className="border p-3">Observable for treated AND control</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold">Sample Size</td>
                          <td className="border p-3 text-emerald-700">Uses full sample ✓</td>
                          <td className="border p-3 text-amber-700">Discards unmatched units</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold">Continuous Predictors</td>
                          <td className="border p-3 text-emerald-700">Handles naturally ✓</td>
                          <td className="border p-3 text-amber-700">Requires dichotomization</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold">Interpretability</td>
                          <td className="border p-3">Odds ratios</td>
                          <td className="border p-3">Average treatment effect</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold">Confounding Control</td>
                          <td className="border p-3">Regression adjustment</td>
                          <td className="border p-3">Matching on observables</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* When PSM Works Tab */}
          <TabsContent value="psm" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">When PSM Is Appropriate</h2>
              
              <p className="text-lg mb-6">
                Propensity Score Matching works well when you have a <strong>causal research question</strong> and 
                the <strong>outcome is observable for both treated and control groups</strong>.
              </p>

              <div className="space-y-8">
                {/* Example 1 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold mb-3">Example 1: Effect of Injury on Career Longevity</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-blue-700">Research Question:</p>
                      <p className="text-lg">Does suffering an ACL injury in year 1 causally reduce career longevity?</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">Treatment</p>
                        <p className="text-sm">ACL injury (yes/no)</p>
                      </Card>
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">Outcome</p>
                        <p className="text-sm">Games played in years 2-5</p>
                        <p className="text-emerald-600 text-xs mt-2">✓ Observable for both groups</p>
                      </Card>
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">PSM Approach</p>
                        <p className="text-sm">Match injured to non-injured players on age, position, pre-injury performance</p>
                      </Card>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <p className="font-semibold text-emerald-800">✓ Why this works:</p>
                      <p className="text-sm mt-1">
                        The outcome (future games played) exists for both injured and non-injured players. 
                        We can directly compare career trajectories after matching on pre-injury characteristics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold mb-3">Example 2: Effect of Draft Position on Development</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-blue-700">Research Question:</p>
                      <p className="text-lg">Does being drafted early (top 20) causally improve player development?</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">Treatment</p>
                        <p className="text-sm">Drafted in top 20 (yes/no)</p>
                      </Card>
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">Outcome</p>
                        <p className="text-sm">Performance metrics in years 2-3</p>
                        <p className="text-emerald-600 text-xs mt-2">✓ Observable for all drafted players</p>
                      </Card>
                      <Card className="p-4 bg-blue-50/50">
                        <p className="font-semibold mb-2">PSM Approach</p>
                        <p className="text-sm">Match early picks to late picks on pre-draft characteristics</p>
                      </Card>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <p className="font-semibold text-emerald-800">✓ Why this works:</p>
                      <p className="text-sm mt-1">
                        Post-draft performance is observable for all drafted players regardless of draft position. 
                        PSM creates comparable groups to isolate the effect of draft position.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Requirements */}
                <Card className="p-6 bg-amber-50 border-amber-200">
                  <h3 className="font-bold text-lg mb-4">Key Requirements for PSM</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold">Causal research question</p>
                        <p className="text-sm text-muted-foreground">You want to know if X causes Y, not just if X predicts Y</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Outcome observable for both groups</p>
                        <p className="text-sm text-muted-foreground">You can measure Y for both treated and control units</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold">Pre-treatment covariates available</p>
                        <p className="text-sm text-muted-foreground">Variables measured before treatment to estimate propensity scores</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-semibold">Common support / overlap</p>
                        <p className="text-sm text-muted-foreground">Treated and control groups have similar covariate distributions</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* When Logistic Works Tab */}
          <TabsContent value="logistic" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">When Logistic Regression Is Appropriate</h2>
              
              <p className="text-lg mb-6">
                Logistic regression is the standard method for <strong>prediction and association</strong> when 
                your outcome is binary. It's simpler, more efficient, and more interpretable than PSM for non-causal questions.
              </p>

              <div className="space-y-6">
                {/* Advantages */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Advantages of Logistic Regression</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Full Sample Utilization</p>
                          <p className="text-sm text-muted-foreground">
                            Uses all observations, maximizing statistical power. PSM discards unmatched units.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Continuous Predictors</p>
                          <p className="text-sm text-muted-foreground">
                            Handles continuous variables naturally without arbitrary dichotomization.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Interpretable Effects</p>
                          <p className="text-sm text-muted-foreground">
                            Odds ratios directly answer "how much does X increase the odds of Y?"
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Model Validation</p>
                          <p className="text-sm text-muted-foreground">
                            Clear metrics (AUC-ROC, pseudo-R²) to evaluate predictive accuracy.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Flexibility</p>
                          <p className="text-sm text-muted-foreground">
                            Easy to add interactions, polynomial terms, or compare nested models.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Standard Method</p>
                          <p className="text-sm text-muted-foreground">
                            Widely understood and accepted for predictive research in sports science.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* What Logistic Regression Provides */}
                <div>
                  <h3 className="text-xl font-bold mb-4">What Logistic Regression Provides</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <p className="font-semibold mb-2">1. Odds Ratios (OR)</p>
                      <p className="text-sm mb-2">
                        Interpretable effect sizes showing how much each predictor increases/decreases selection odds.
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-sm">
                        OR = 1.76 means 76% higher odds of selection per unit increase in predictor
                      </div>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">2. Confidence Intervals</p>
                      <p className="text-sm mb-2">
                        Uncertainty quantification for each effect, crucial for inference.
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-sm">
                        OR = 1.76 [95% CI: 1.52, 2.04] → Statistically significant
                      </div>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">3. Model Fit Statistics</p>
                      <p className="text-sm mb-2">
                        AUC-ROC and pseudo-R² evaluate how well the model predicts outcomes.
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-sm">
                        AUC = 0.829 → Excellent discrimination between selected and non-selected
                      </div>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">4. Predicted Probabilities</p>
                      <p className="text-sm mb-2">
                        Individual-level predictions for practical application.
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-sm">
                        Player A: 85% probability of selection based on PC scores
                      </div>
                    </Card>
                  </div>
                </div>

                {/* When NOT to use Logistic Regression */}
                <Card className="p-6 bg-red-50 border-red-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    When Logistic Regression Is NOT Appropriate
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">You need causal estimates</p>
                        <p className="text-sm text-muted-foreground">
                          If your goal is to estimate treatment effects, logistic regression alone is insufficient 
                          (though it can be part of a causal inference strategy with proper assumptions).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Outcome is not binary</p>
                        <p className="text-sm text-muted-foreground">
                          Use linear regression for continuous outcomes, multinomial logistic for multiple categories, 
                          or ordinal logistic for ordered categories.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Severe class imbalance</p>
                        <p className="text-sm text-muted-foreground">
                          When one outcome is extremely rare (e.g., &lt;1%), consider rare events logistic regression 
                          or alternative methods.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Case Study Tab */}
          <TabsContent value="case-study" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Our AFL/AFLW Case Study</h2>
              
              <p className="text-lg mb-6">
                Our analysis of VFL/VFLW to AFL/AFLW selection demonstrates why logistic regression 
                was the appropriate choice and why PSM would have been fundamentally incompatible with our data structure.
              </p>

              <div className="space-y-8">
                {/* Research Questions */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Our Research Questions</h3>
                  <div className="space-y-3">
                    <Card className="p-4 border-l-4 border-emerald-500">
                      <p className="font-semibold mb-1">1. What performance dimensions predict selection?</p>
                      <p className="text-sm text-muted-foreground">
                        This is a <strong>prediction question</strong>, not a causal question. 
                        We want to know which factors are associated with selection, not whether they cause it.
                      </p>
                    </Card>
                    <Card className="p-4 border-l-4 border-emerald-500">
                      <p className="font-semibold mb-1">2. Do these predictors differ by gender?</p>
                      <p className="text-sm text-muted-foreground">
                        This is a <strong>comparative association question</strong>. 
                        We're comparing the strength of predictive relationships across groups.
                      </p>
                    </Card>
                    <Card className="p-4 border-l-4 border-emerald-500">
                      <p className="font-semibold mb-1">3. How well do performance metrics predict selection?</p>
                      <p className="text-sm text-muted-foreground">
                        This is a <strong>model fit question</strong>. 
                        We're evaluating predictive accuracy, not causal effects.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* The Fundamental Problem */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Why PSM Was Impossible</h3>
                  <Card className="p-6 bg-red-50 border-red-200">
                    <p className="font-semibold text-lg mb-4">The Structural Impossibility</p>
                    <p className="mb-4">
                      PSM requires an outcome that exists for both treated (selected) and control (non-selected) groups. 
                      In our study:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-red-300">
                        <p className="font-semibold mb-2">What we wanted to measure:</p>
                        <p className="text-sm">AFL/AFLW performance in 2025 season</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-300">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Selected Players
                          </p>
                          <p className="text-sm">AFL/AFLW performance is <strong>observable</strong></p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg border border-red-300">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Non-Selected Players
                          </p>
                          <p className="text-sm">AFL/AFLW performance is <strong>structurally impossible</strong> to observe</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
                        <p className="font-semibold mb-2">Why this matters:</p>
                        <p className="text-sm">
                          This isn't a missing data problem that can be solved through imputation. 
                          Non-selected players don't play in AFL/AFLW, so their AFL/AFLW performance 
                          <em>cannot exist</em>. PSM requires comparing outcomes between matched groups, 
                          but we have no outcome to compare for the control group.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* What We Did Instead */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Our Logistic Regression Approach</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <p className="font-semibold mb-2">Step 1: Dimension Reduction (PCA)</p>
                      <p className="text-sm text-muted-foreground">
                        Reduced 9 correlated performance statistics to 4 interpretable dimensions (PC1-PC4). 
                        This handles multicollinearity and identifies latent performance constructs.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">Step 2: Logistic Regression</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Modeled selection (binary outcome) as a function of PC scores, age, and height:
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-sm">
                        logit(P(Selected)) = β₀ + β₁(PC1) + β₂(PC2) + β₃(PC3) + β₄(PC4) + β₅(Age) + β₆(Height)
                      </div>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">Step 3: Model Evaluation</p>
                      <p className="text-sm text-muted-foreground">
                        Assessed discrimination (AUC-ROC) and fit (pseudo-R²). 
                        Female model: AUC=0.829, Male model: AUC=0.774 — both indicating excellent predictive accuracy.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <p className="font-semibold mb-2">Step 4: Interpretation</p>
                      <p className="text-sm text-muted-foreground">
                        Reported odds ratios with confidence intervals. 
                        Example: Female PC1 OR=1.76 means 76% higher selection odds per unit increase.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Key Findings */}
                <div>
                  <h3 className="text-xl font-bold mb-4">What We Discovered</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-blue-50">
                      <p className="font-semibold mb-3">Female Pathway</p>
                      <ul className="space-y-2 text-sm">
                        <li>• PC1 (game involvement): OR=1.76 ⭐</li>
                        <li>• PC2 (marking/defense): OR=0.98 (no effect)</li>
                        <li>• PC3: OR=1.45 ⭐</li>
                        <li>• Model AUC: 0.829 (excellent)</li>
                      </ul>
                    </Card>

                    <Card className="p-4 bg-emerald-50">
                      <p className="font-semibold mb-3">Male Pathway</p>
                      <ul className="space-y-2 text-sm">
                        <li>• PC1 (game involvement): OR=1.62 ⭐</li>
                        <li>• PC2 (marking/defense): OR=1.45 ⭐</li>
                        <li>• PC3: OR=0.95 (no effect)</li>
                        <li>• Model AUC: 0.774 (good)</li>
                      </ul>
                    </Card>
                  </div>
                  <Card className="p-4 mt-4 bg-amber-50 border-amber-200">
                    <p className="font-semibold mb-2">The Surprising Finding:</p>
                    <p className="text-sm">
                      PC2 and PC3 show <strong>opposite effects</strong> across genders! 
                      Marking/defense matters for male selection but not female selection, 
                      while PC3 matters for female selection but not male selection. 
                      This gender difference would have been impossible to discover with PSM.
                    </p>
                  </Card>
                </div>

                {/* Why This Matters */}
                <Card className="p-6 bg-primary/5 border-primary">
                  <h3 className="font-bold text-lg mb-4">Why Our Approach Was Correct</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Answered our research questions directly</p>
                        <p className="text-sm text-muted-foreground">
                          We asked prediction questions, we used prediction methods
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Maximized statistical power</p>
                        <p className="text-sm text-muted-foreground">
                          Used full sample (1,636 players), PSM would have discarded unmatched observations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Provided interpretable results</p>
                        <p className="text-sm text-muted-foreground">
                          Odds ratios directly answer "how much does each factor increase selection odds?"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Enabled gender comparison</p>
                        <p className="text-sm text-muted-foreground">
                          Easy to compare coefficients and model fit across male and female samples
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="p-8 mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Want to See the Full Analysis?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our complete VFLW/AFLW study with interactive player database and detailed statistical results
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Analysis
              </a>
              <a href="/database" className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
                Player Database
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
