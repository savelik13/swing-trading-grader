import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const criteria = [
  { key: "spy", label: "SPY Current Position", weight: 10 },
  { key: "qqq", label: "QQQ Current Position", weight: 10 },
  { key: "iwm", label: "IWM Current Position", weight: 10 },
  { key: "highQualitySetups", label: "# High-Quality Setups", weight: 15 },
  { key: "lowQualitySetups", label: "# Low-Quality Setups", weight: 5 },
  { key: "distanceFromMA", label: "Distance from MAs (1-far, 10-perfect)", weight: 10 },
  { key: "breakoutFollowThrough", label: "Breakouts Follow-Through (Last 5 days)", weight: 15 },
  { key: "setupVisibility", label: "Are setups screaming at you? (1-10)", weight: 15 },
];

export default function SwingTradingGrader() {
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (key, value) => {
    setInputs({ ...inputs, [key]: parseInt(value) });
  };

  const calculateScore = () => {
    let total = 0;
    criteria.forEach(({ key, weight }) => {
      const value = inputs[key] || 0;
      total += (value / 10) * weight;
    });
    setScore(Math.round(total));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Swing Trading Market Grader</h1>
      <Card className="mb-6">
        <CardContent className="space-y-4 pt-4">
          {criteria.map(({ key, label }) => (
            <div key={key}>
              <Label htmlFor={key}>{label}</Label>
              <Input
                type="number"
                id={key}
                min={1}
                max={10}
                value={inputs[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          ))}
          <Button onClick={calculateScore}>Calculate Score</Button>
        </CardContent>
      </Card>

      {score !== null && (
        <Card>
          <CardContent className="pt-4">
            <h2 className="text-xl font-semibold mb-2">Market Favorability Score</h2>
            <p className="text-4xl font-bold text-center">{score}/100</p>
            <Progress value={score} className="mt-4" />
            <p className="text-center mt-2 text-sm text-gray-500">
              {score >= 75
                ? "Strong conditions for swing trading"
                : score >= 50
                ? "Mixed or cautious conditions"
                : "Unfavorable conditions for swing entries"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
