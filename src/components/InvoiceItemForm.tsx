
import React, { useState } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TaxForm from "./TaxForm";
import { motion } from "framer-motion";

interface InvoiceItemFormProps {
  index: number;
  item: {
    quantity: number;
    description: string;
    product_key: string;
    unit_key: string;
    unit_name: string;
    price: number;
    tax_included: boolean;
    taxes: Array<{
      tax: string;
      factor: string;
      rate: number;
      withholding: boolean;
    }>;
  };
  onChange: (index: number, item: any) => void;
  onRemove: (index: number) => void;
}

const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({ 
  index, 
  item, 
  onChange, 
  onRemove 
}) => {
  const handleChange = (field: string, value: any) => {
    onChange(index, { ...item, [field]: value });
  };

  const handleTaxChange = (itemIndex: number, taxIndex: number, tax: any) => {
    const newTaxes = [...item.taxes];
    newTaxes[taxIndex] = tax;
    handleChange("taxes", newTaxes);
  };

  const handleAddTax = () => {
    handleChange("taxes", [
      ...item.taxes, 
      { tax: "002", factor: "Tasa", rate: 0.16, withholding: false }
    ]);
  };

  const handleRemoveTax = (itemIndex: number, taxIndex: number) => {
    const newTaxes = [...item.taxes];
    newTaxes.splice(taxIndex, 1);
    handleChange("taxes", newTaxes);
  };

  return (
    <motion.div 
      className="form-card mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-invoice-purple-700">Ítem #{index + 1}</h3>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="text-invoice-purple-500 hover:text-invoice-purple-700 hover:bg-invoice-purple-100"
          onClick={() => onRemove(index)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`quantity-${index}`}>Cantidad</Label>
          <Input
            id={`quantity-${index}`}
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
            className="input-animated"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`description-${index}`}>Descripción</Label>
          <Input
            id={`description-${index}`}
            value={item.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="input-animated"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`product-key-${index}`}>Clave del Producto</Label>
          <Input
            id={`product-key-${index}`}
            value={item.product_key}
            onChange={(e) => handleChange("product_key", e.target.value)}
            className="input-animated"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`unit-key-${index}`}>Clave de Unidad</Label>
          <Input
            id={`unit-key-${index}`}
            value={item.unit_key}
            onChange={(e) => handleChange("unit_key", e.target.value)}
            className="input-animated"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`unit-name-${index}`}>Nombre de la Unidad</Label>
          <Input
            id={`unit-name-${index}`}
            value={item.unit_name}
            onChange={(e) => handleChange("unit_name", e.target.value)}
            className="input-animated"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`price-${index}`}>Precio Unitario</Label>
          <Input
            id={`price-${index}`}
            type="number"
            step="0.01"
            value={item.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
            className="input-animated"
          />
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-2 mb-4">
          <Switch
            id={`tax-included-${index}`}
            checked={item.tax_included}
            onCheckedChange={(checked) => handleChange("tax_included", checked)}
          />
          <Label htmlFor={`tax-included-${index}`}>¿Impuestos Incluidos?</Label>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-invoice-purple-600">Impuestos</h4>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-invoice-purple-600 border-invoice-purple-300 hover:bg-invoice-purple-100"
            onClick={handleAddTax}
          >
            <Plus className="h-4 w-4 mr-2" /> Agregar Impuesto
          </Button>
        </div>
        
        {item.taxes.map((tax, taxIndex) => (
          <TaxForm
            key={taxIndex}
            index={taxIndex}
            itemIndex={index}
            tax={tax}
            onChange={handleTaxChange}
            onRemove={handleRemoveTax}
          />
        ))}
        
        {item.taxes.length === 0 && (
          <div className="text-center py-4 text-invoice-purple-400 italic text-sm">
            No hay impuestos agregados
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InvoiceItemForm;
