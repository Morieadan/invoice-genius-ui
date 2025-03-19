
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TaxFormProps {
  index: number;
  itemIndex: number;
  tax: {
    tax: string;
    factor: string;
    rate: number;
    withholding: boolean;
  };
  onChange: (itemIndex: number, taxIndex: number, tax: any) => void;
  onRemove: (itemIndex: number, taxIndex: number) => void;
}

const TaxForm: React.FC<TaxFormProps> = ({ index, itemIndex, tax, onChange, onRemove }) => {
  const handleChange = (field: string, value: any) => {
    onChange(itemIndex, index, { ...tax, [field]: value });
  };

  return (
    <div className="p-4 bg-invoice-purple-50 rounded-lg mb-4 border border-invoice-purple-100 relative animate-fade-in">
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 text-invoice-purple-500 hover:text-invoice-purple-700 hover:bg-invoice-purple-100"
        onClick={() => onRemove(itemIndex, index)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`tax-type-${itemIndex}-${index}`}>Tipo de Impuesto</Label>
          <Select 
            value={tax.tax} 
            onValueChange={(value) => handleChange("tax", value)}
          >
            <SelectTrigger id={`tax-type-${itemIndex}-${index}`} className="select-animated">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="001">ISR</SelectItem>
              <SelectItem value="002">IVA</SelectItem>
              <SelectItem value="003">IEPS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`tax-factor-${itemIndex}-${index}`}>Factor</Label>
          <Select 
            value={tax.factor} 
            onValueChange={(value) => handleChange("factor", value)}
          >
            <SelectTrigger id={`tax-factor-${itemIndex}-${index}`} className="select-animated">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tasa">Tasa</SelectItem>
              <SelectItem value="Cuota">Cuota</SelectItem>
              <SelectItem value="Exento">Exento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`tax-rate-${itemIndex}-${index}`}>Tasa (decimal)</Label>
          <Input
            id={`tax-rate-${itemIndex}-${index}`}
            type="number"
            step="0.01"
            value={tax.rate}
            onChange={(e) => handleChange("rate", parseFloat(e.target.value))}
            className="input-animated"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id={`tax-withholding-${itemIndex}-${index}`}
            checked={tax.withholding}
            onCheckedChange={(checked) => handleChange("withholding", checked)}
          />
          <Label htmlFor={`tax-withholding-${itemIndex}-${index}`}>Retención</Label>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;
