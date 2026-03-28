"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from 'react-i18next';
import { History, Calendar, Sprout, TrendingUp, ChevronRight, Search } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";

interface AnalysisHistoryItem {
    id: string;
    date: string;
    crop: string;
    district: string;
    totalDetections: number;
    expectedYield: number;
    status: 'Completed' | 'Pending' | 'Archived';
}

const mockHistory: AnalysisHistoryItem[] = [];

export function HistoryTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Analysis History
          </h2>
          <p className="text-muted-foreground text-sm">Review and compare your past field analysis reports.</p>
        </div>
        <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search history..." className="pl-9 bg-muted/30" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold flex items-baseline gap-2">
                    {mockHistory.length}
                    <Badge variant="outline" className="text-[10px] font-bold bg-background">YTD</Badge>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Avg. Detections</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold italic text-primary">0</div>
                <p className="text-[10px] text-muted-foreground mt-1 underline decoration-primary/30">Across all samples</p>
            </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Forecasted</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-foreground">0 <span className="text-sm font-normal text-muted-foreground">kg</span></div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold mt-1">
                    No data available
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-primary/5 overflow-hidden">
        <ScrollArea className="h-[500px]">
            {mockHistory.length > 0 ? (
                <Table>
                    <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-md">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[180px] font-bold uppercase text-[10px] tracking-widest">{t('date')}</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">Details</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">Detections</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">Est. Yield</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockHistory.map((item) => (
                            <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <Calendar className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{format(parseISO(item.date), 'MMM dd, yyyy')}</span>
                                            <span className="text-[10px] text-muted-foreground">{format(parseISO(item.date), 'hh:mm a')}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold flex items-center gap-1 italic">
                                            <Sprout className="h-3 w-3 text-primary" />
                                            {item.crop}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            {item.district}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm font-bold tabular-nums">{item.totalDetections}</div>
                                    <div className="text-[10px] text-muted-foreground">samples id'd</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm font-bold tabular-nums text-primary">{formatNumber(item.expectedYield, 1)} kg</div>
                                    <div className="text-[10px] text-muted-foreground italic">forecasted</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.status === 'Archived' ? 'secondary' : 'default'} className="text-[10px] font-bold px-2 py-0">
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center p-20 text-center">
                    <div className="p-4 bg-primary/5 rounded-full mb-4">
                        <History className="h-12 w-12 text-primary/30" />
                    </div>
                    <h3 className="font-headline text-lg font-semibold tracking-tight">No History Records Found</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2">
                        Start your first field analysis in the <span className="text-primary font-bold italic underline">Detect</span> tab to see records appearing here.
                    </p>
                </div>
            )}
        </ScrollArea>
      </Card>

      <div className="p-4 rounded-xl border border-dashed border-primary/20 bg-primary/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded-full shadow-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
                <p className="text-sm font-bold italic">Comparative Insights</p>
                <p className="text-xs text-muted-foreground">Your average yield per plant has increased by 0.4kg since February.</p>
            </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-bold hover:text-primary hover:bg-primary/10">
            View Analytics
        </Button>
      </div>
    </div>
  );
}
