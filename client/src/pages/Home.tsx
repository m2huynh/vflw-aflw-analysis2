import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Database, FileText, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero text-white">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              VFLW to AFLW<br />
              <span className="text-white/80">Pathway Analysis</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Data-driven insights into the factors that predict AFL Women's selection from VFL Women's performance
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/database">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
                  <Database className="mr-2 h-5 w-5" />
                  Explore Player Database
                </Button>
              </Link>
              <Link href="/analysis">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Key Findings</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analysis of 616 VFLW players reveals clear predictors of AFL progression
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">76% Higher Odds</CardTitle>
              <CardDescription className="text-base">
                Players with one unit higher PC1 (game involvement) have 76% increased odds of AFL selection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-2xl">0.829 AUC-ROC</CardTitle>
              <CardDescription className="text-base">
                Excellent model discrimination - correctly ranks players 83% of the time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">25.8% Selection Rate</CardTitle>
              <CardDescription className="text-base">
                159 of 616 VFLW players progressed to AFLW in 2025
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* What is PC1 */}
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6">What is PC1?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">PC1 (Principal Component 1)</strong> represents overall game involvement and statistical output. 
                It's the single most important factor in predicting AFL selection, capturing 37% of all performance variation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Players with high PC1 scores consistently produce across multiple statistics including disposals, marks, 
                tackles, clearances, and inside 50s. This dimension reflects a player's ability to impact the game in 
                multiple ways.
              </p>
              <div className="bg-card p-6 rounded-lg border-2 border-primary/20">
                <p className="text-base font-semibold text-primary mb-2">Bottom Line</p>
                <p className="text-base text-card-foreground">
                  If you want to play AFLW, maximize your game involvement in VFLW. Volume and consistency matter most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Explore the Data</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive tools to understand the pathway from VFL to AFL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="gradient-card border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <Database className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-2xl">Player Database</CardTitle>
              <CardDescription className="text-base">
                Search and filter 616 VFLW players with detailed statistics, performance metrics, and AFL selection predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/database">
                <Button className="w-full" size="lg">
                  Browse Players
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="text-2xl">Statistical Analysis</CardTitle>
              <CardDescription className="text-base">
                Comprehensive breakdown of the logistic regression model, PCA results, and visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/analysis">
                <Button className="w-full" size="lg" variant="outline">
                  View Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-card border-t py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Methodology</h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Data Collection</h3>
              <p className="leading-relaxed">
                Player statistics from VFLW 2024 season and AFLW 2025 selection outcomes were collected and analyzed. 
                The dataset includes 616 players with 13 performance metrics per player.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Principal Component Analysis</h3>
              <p className="leading-relaxed">
                PCA was used to reduce the 13 correlated performance statistics into 4 uncorrelated principal components, 
                explaining 71% of total variance. This dimensionality reduction reveals the main patterns of player performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Logistic Regression</h3>
              <p className="leading-relaxed">
                A logistic regression model predicts AFL selection probability based on the 4 principal components plus 
                age and height. The model achieves excellent discrimination (AUC = 0.829) and fit (Pseudo R² = 0.250).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
