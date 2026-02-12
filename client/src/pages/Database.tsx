import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Search, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  given_name: string;
  surname: string;
  age: number | null;
  height: number | null;
  position: string;
  pc1: number | null;
  pc2: number | null;
  pc3: number | null;
  pc4: number | null;
  predicted_prob: number | null;
  selected: boolean;
  vfl_stats: {
    goals: number;
    kicks: number;
    handballs: number;
    disposals: number;
    marks: number;
    tackles: number;
  };
}

type SortField = 'name' | 'predicted_prob' | 'pc1' | 'age' | 'height';
type SortDirection = 'asc' | 'desc';

export default function Database() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [selectionFilter, setSelectionFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('predicted_prob');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/players.json')
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load players:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesSelection = selectionFilter === 'all' || 
        (selectionFilter === 'selected' && player.selected) ||
        (selectionFilter === 'not_selected' && !player.selected);
      
      return matchesSearch && matchesPosition && matchesSelection;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortField) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'predicted_prob':
          aVal = a.predicted_prob ?? -1;
          bVal = b.predicted_prob ?? -1;
          break;
        case 'pc1':
          aVal = a.pc1 ?? -999;
          bVal = b.pc1 ?? -999;
          break;
        case 'age':
          aVal = a.age ?? -1;
          bVal = b.age ?? -1;
          break;
        case 'height':
          aVal = a.height ?? -1;
          bVal = b.height ?? -1;
          break;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    setFilteredPlayers(filtered);
  }, [players, searchTerm, positionFilter, selectionFilter, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const positions = Array.from(new Set(players.map(p => p.position).filter(p => p && p !== 'Unknown')));

  const getProbabilityColor = (prob: number | null) => {
    if (prob === null) return 'bg-muted';
    if (prob >= 0.7) return 'bg-primary';
    if (prob >= 0.4) return 'bg-accent';
    return 'bg-muted';
  };

  const getProbabilityLabel = (prob: number | null) => {
    if (prob === null) return 'N/A';
    if (prob >= 0.7) return 'High';
    if (prob >= 0.4) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading player database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero text-white py-16">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Player Database</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Searchable database of {players.length} VFLW players with AFL selection predictions
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {positions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectionFilter} onValueChange={setSelectionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Players" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Players</SelectItem>
                  <SelectItem value="selected">Selected for AFLW</SelectItem>
                  <SelectItem value="not_selected">Not Selected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPlayers.length} of {players.length} players
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('predicted_prob')}
              className={sortField === 'predicted_prob' ? 'bg-accent/10' : ''}
            >
              Selection Probability
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('pc1')}
              className={sortField === 'pc1' ? 'bg-accent/10' : ''}
            >
              PC1 (Game Involvement)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map(player => (
            <Card key={player.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{player.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {player.position && player.position !== 'Unknown' && (
                        <Badge variant="outline">{player.position}</Badge>
                      )}
                      {player.selected && (
                        <Badge className="bg-primary">Selected AFLW</Badge>
                      )}
                    </div>
                  </div>
                  {player.predicted_prob !== null && (
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {(player.predicted_prob * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getProbabilityLabel(player.predicted_prob)} Probability
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Demographics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {player.age !== null && (
                      <div>
                        <div className="text-muted-foreground">Age</div>
                        <div className="font-semibold">{player.age.toFixed(1)} years</div>
                      </div>
                    )}
                    {player.height !== null && player.height > 0 && (
                      <div>
                        <div className="text-muted-foreground">Height</div>
                        <div className="font-semibold">{player.height.toFixed(0)} cm</div>
                      </div>
                    )}
                  </div>

                  {/* Principal Components */}
                  {player.pc1 !== null && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Performance Metrics</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-muted p-2 rounded">
                          <div className="text-muted-foreground">PC1</div>
                          <div className="font-mono font-semibold">{player.pc1.toFixed(2)}</div>
                        </div>
                        {player.pc3 !== null && (
                          <div className="bg-muted p-2 rounded">
                            <div className="text-muted-foreground">PC3</div>
                            <div className="font-mono font-semibold">{player.pc3.toFixed(2)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* VFL Stats */}
                  <div className="border-t pt-3">
                    <div className="text-xs text-muted-foreground mb-2">VFLW 2024 Averages</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">Disposals</div>
                        <div className="font-semibold">{player.vfl_stats.disposals.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Marks</div>
                        <div className="font-semibold">{player.vfl_stats.marks.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Tackles</div>
                        <div className="font-semibold">{player.vfl_stats.tackles.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Probability Bar */}
                  {player.predicted_prob !== null && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Selection Probability</div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProbabilityColor(player.predicted_prob)} transition-all`}
                          style={{ width: `${player.predicted_prob * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No players found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
