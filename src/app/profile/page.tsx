"use client";

import React, { useState } from 'react';
import { AgriVisionHeader } from "@/components/agrivision/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useUser } from '@/firebase';
import { Phone, MapPin, Mail, Calendar, User, Sprout, Landmark } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 text-foreground pb-20">
      <AgriVisionHeader />
      
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Farmer Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your farming identity and operational data.</p>
            </div>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save Selection" : "Edit Profile"}
            </Button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Left Column: Summary Card */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-primary/20 bg-card shadow-lg">
                <div className="h-24 bg-gradient-to-r from-primary/80 to-primary/40" />
                <CardHeader className="text-center -mt-12">
                <div className="flex justify-center mb-4">
                    <div className="relative p-1 bg-background rounded-full ring-4 ring-primary/20">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://i.pravatar.cc/150?u=agripro" alt="Farmer" />
                            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">RK</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] bg-primary">PRO</Badge>
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold">Rajesh Kumar</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1 font-medium">
                    <Sprout className="h-3.5 w-3.5 text-primary" />
                    Commercial Tomato Specialist
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Coimbatore, Tamil Nadu</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Member since March 2026</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Landmark className="h-4 w-4 text-primary" />
                        <span>Tamil Nadu Agriculture Dept verified</span>
                    </div>
                </div>
                <Separator />
                <div className="pt-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-3">Farm Stats</div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-muted/50 p-2 rounded-lg">
                            <div className="text-lg font-bold text-primary italic">12.5</div>
                            <div className="text-[9px] uppercase font-semibold text-muted-foreground">Total Acres</div>
                        </div>
                        <div className="bg-muted/50 p-2 rounded-lg">
                            <div className="text-lg font-bold text-primary italic">8+</div>
                            <div className="text-[9px] uppercase font-semibold text-muted-foreground">Years Exp.</div>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
                <CardContent className="p-4 flex items-center gap-3">
                    <Info className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-xs leading-relaxed text-muted-foreground italic">
                        "AgriPro helps me optimize my harvest window. Since using the AI forecast, my post-harvest waste reduced by 14%."
                    </p>
                </CardContent>
            </Card>
          </div>

          {/* Right Column: Detailed Info Tabs/Cards */}
          <div className="space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                </CardTitle>
                <CardDescription>Update your contact and identification details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name</Label>
                    <Input id="firstName" defaultValue="Rajesh" disabled={!isEditing} className="bg-muted/30 focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                    <Input id="lastName" defaultValue="Kumar" disabled={!isEditing} className="bg-muted/30 focus-visible:ring-primary" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" /> Email Address
                    </Label>
                    <Input id="email" type="email" defaultValue={user?.email || "agripro@example.com"} disabled className="bg-muted/10 opacity-70" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Phone className="h-3 w-3" /> Phone Number
                    </Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" disabled={!isEditing} className="bg-muted/30 focus-visible:ring-primary" />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sprout className="h-24 w-24 text-primary" />
                </div>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-primary" />
                    Agricultural & Farm Details
                </CardTitle>
                <CardDescription>Details used to calibrate your AI forecasting models.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="district" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary District</Label>
                        <Select disabled={!isEditing} defaultValue="coimbatore">
                            <SelectTrigger className="bg-muted/30">
                                <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="coimbatore">Coimbatore</SelectItem>
                                <SelectItem value="madurai">Madurai</SelectItem>
                                <SelectItem value="salem">Salem</SelectItem>
                                <SelectItem value="erode">Erode</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cropType" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Crop Type</Label>
                        <Select disabled={!isEditing} defaultValue="tomato">
                            <SelectTrigger className="bg-muted/30 font-semibold text-primary">
                                <SelectValue placeholder="Select Crop" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tomato">Arka Abha (Tomato)</SelectItem>
                                <SelectItem value="tomato-cherry">H-86 (Cherry Tomato)</SelectItem>
                                <SelectItem value="pepper">Bell Pepper</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Farm Size (Acres)</Label>
                    <div className="relative">
                        <Input id="farmSize" type="number" defaultValue="12.5" disabled={!isEditing} className="bg-muted/30 pr-12" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">ACRES</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Farming Experience</Label>
                    <div className="relative">
                        <Input id="experience" type="number" defaultValue="8" disabled={!isEditing} className="bg-muted/30 pr-14" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">YEARS</span>
                    </div>
                  </div>
                </div>
                
                <Separator />

                <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 italic">
                        <Landmark className="h-3 w-3" /> Historical Data Opt-in
                    </h3>
                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Help keep our models localized! By sharing your historical yield data, you contribute to better accuracy for the entire <span className="text-primary font-bold">Coimbatore</span> farming community.
                        </p>
                    </div>
                </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Info } from 'lucide-react';
