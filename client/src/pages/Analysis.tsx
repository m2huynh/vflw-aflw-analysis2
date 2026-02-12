import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

interface Summary {
  total_players: number;
  selected: number;
  not_selected: number;
  selection_rate: number;
  mean_age: number;
  mean_height: number;
  pc_variance: {
    PC1: number;
    PC2: number;
    PC3: number;
    PC4: number;
  };
}

interface ModelCoefficients {
  intercept: number;
  coefficients: {
    PC1: number;
    PC2: number;
    PC3: number;
    PC4: number;
    age_c: number;
    height_c: number;
  };
  odds_ratios: {
    PC1: number;
    PC2: number;
    PC3: number;
    PC4: number;
    age_c: number;
    height_c: number;
  };
}

export default function Analysis() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [model, setModel] = useState<ModelCoefficients | null>(null);

  useEffect(() => {
    fetch('/summary.json')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error('Failed to load summary:', err));

    fetch('/model.json')
      .then(res => res.json())
      .then(data => setModel(data))
      .catch(err => console.error('Failed to load model:', err));
  }, []);

  if (!summary || !model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero text-white py-16">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Statistical Analysis</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Comprehensive breakdown of the logistic regression model predicting AFLW selection from VFLW performance
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardDescription>Total Players</CardDescription>
              <CardTitle className="text-4xl">{summary.total_players}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Selected for AFLW</CardDescription>
              <CardTitle className="text-4xl text-primary">{summary.selected}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Selection Rate</CardDescription>
              <CardTitle className="text-4xl">{(summary.selection_rate * 100).toFixed(1)}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Mean Age</CardDescription>
              <CardTitle className="text-4xl">{summary.mean_age.toFixed(1)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pca">PCA Results</TabsTrigger>
            <TabsTrigger value="model">Model Coefficients</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
                <CardDescription>Key findings from the analysis</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  This analysis examines <strong>{summary.total_players} female players</strong> from the VFL Women's (VFLW) 2024 season 
                  to identify factors that predict selection for the AFL Women's (AFLW) 2025 season.
                </p>
                <p>
                  Using principal component analysis (PCA) and logistic regression, we identified key performance and demographic 
                  characteristics that distinguish players who progress to the top-tier competition.
                </p>
                <div className="bg-accent/10 border-l-4 border-accent p-4 my-4">
                  <p className="font-semibold text-accent-foreground mb-2">Key Finding</p>
                  <p className="text-sm">
                    Game involvement (PC1) is the strongest predictor of AFL selection, with players scoring one unit higher 
                    on this dimension having <strong>{((model.odds_ratios.PC1 - 1) * 100).toFixed(1)}% higher odds</strong> of being selected.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>How well the model predicts AFL selection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">AUC-ROC</div>
                    <div className="text-2xl font-bold">0.829</div>
                    <div className="text-xs text-muted-foreground">Excellent discrimination</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Pseudo R²</div>
                    <div className="text-2xl font-bold">0.250</div>
                    <div className="text-xs text-muted-foreground">Excellent fit (&gt;0.2 is very good)</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-2xl font-bold">78.7%</div>
                    <div className="text-xs text-muted-foreground">Correctly classifies players</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="text-2xl font-bold">74.3%</div>
                    <div className="text-xs text-muted-foreground">Predicted selections are correct</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pca" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Principal Component Analysis</CardTitle>
                <CardDescription>Dimensionality reduction of 13 performance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  PCA reduces the 13 correlated performance statistics into uncorrelated components that capture 
                  the main patterns of player performance.
                </p>
                <div className="space-y-4">
                  {Object.entries(summary.pc_variance).map(([pc, variance]) => (
                    <div key={pc} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{pc}</span>
                        <span className="text-muted-foreground">{(variance * 100).toFixed(1)}% variance</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${variance * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-2">Cumulative Variance Explained</div>
                  <div className="text-3xl font-bold text-primary">
                    {(Object.values(summary.pc_variance).reduce((a, b) => a + b, 0) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">by first 4 components</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logistic Regression Coefficients</CardTitle>
                <CardDescription>Effect of each predictor on AFL selection probability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(model.coefficients)
                    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                    .map(([variable, coefficient]) => {
                      const oddsRatio = model.odds_ratios[variable as keyof typeof model.odds_ratios];
                      const pctChange = (oddsRatio - 1) * 100;
                      const isPositive = coefficient > 0;
                      
                      return (
                        <div key={variable} className="border-b pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-semibold text-lg">{variable}</div>
                              <div className="text-sm text-muted-foreground">
                                {variable === 'PC1' && 'Game Involvement'}
                                {variable === 'PC2' && 'Secondary Performance Dimension'}
                                {variable === 'PC3' && 'Tertiary Performance Dimension'}
                                {variable === 'PC4' && 'Quaternary Performance Dimension'}
                                {variable === 'age_c' && 'Age (centered)'}
                                {variable === 'height_c' && 'Height (centered)'}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                                {isPositive ? '+' : ''}{pctChange.toFixed(1)}%
                              </div>
                              <div className="text-xs text-muted-foreground">change in odds</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Coefficient:</span>{' '}
                              <span className="font-mono">{coefficient.toFixed(4)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Odds Ratio:</span>{' '}
                              <span className="font-mono">{oddsRatio.toFixed(3)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Equation</CardTitle>
                <CardDescription>Logistic regression formula</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="mb-2">log(odds) = {model.intercept.toFixed(3)}</div>
                  {Object.entries(model.coefficients).map(([variable, coefficient]) => (
                    <div key={variable} className="ml-4">
                      {coefficient >= 0 ? '+' : ''} {coefficient.toFixed(3)} × {variable}
                    </div>
                  ))}
                  <div className="mt-4 text-xs text-muted-foreground">
                    probability = 1 / (1 + exp(-log(odds)))
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualizations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PCA & Model Coefficients</CardTitle>
                <CardDescription>Variance explained and predictor effects</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/female_analysis_1.png" 
                  alt="PCA and Coefficients Analysis" 
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PC Distributions by Selection Status</CardTitle>
                <CardDescription>Comparing selected vs. non-selected players</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/female_analysis_2.png" 
                  alt="PC Distributions" 
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>ROC curve and prediction distributions</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/female_analysis_3.png" 
                  alt="ROC Curve and Predictions" 
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
