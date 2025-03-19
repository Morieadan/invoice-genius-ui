
import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import InvoiceItemForm from "./InvoiceItemForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_ITEM = {
  quantity: 1,
  description: "",
  product_key: "",
  unit_key: "",
  unit_name: "",
  price: 0,
  tax_included: false,
  taxes: []
};

const InvoiceForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    api_key: "sk_test_KyExk29qMJmwDP8B6Kq0XN0QlB4aXvrONzLdbARW3l",
    customer: "",
    tax_id: "",
    tax_system: "601",
    type: "I",
    payment_method: "PPD",
    payment_form: "99",
    date: new Date(),
    items: [{ ...DEFAULT_ITEM }]
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemChange = (index: number, item: any) => {
    const newItems = [...formData.items];
    newItems[index] = item;
    handleChange("items", newItems);
  };

  const handleAddItem = () => {
    handleChange("items", [...formData.items, { ...DEFAULT_ITEM }]);
  };

  const handleRemoveItem = (index: number) => {
    if (formData.items.length === 1) {
      toast.error("Debe haber al menos un ítem en la factura");
      return;
    }
    
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    handleChange("items", newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format the data for API submission
      const invoiceData = {
        customer: formData.customer,
        tax_id: formData.tax_id,
        tax_system: formData.tax_system,
        type: formData.type,
        payment_method: formData.payment_method,
        payment_form: formData.payment_form,
        date: format(formData.date, "yyyy-MM-dd'T'HH:mm:ss"),
        items: formData.items
      };

      // In a real application, this would be sent to the API
      console.log("Sending invoice data to API:", invoiceData);
      console.log("API Key used:", formData.api_key);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Factura generada exitosamente", {
        description: "Se ha generado la factura con " + formData.items.length + " ítems",
        duration: 5000,
      });
      
      // For demo purposes, we're not resetting the form
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Error al generar la factura", {
        description: "Por favor revise los datos e intente nuevamente",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="form-card">
          <h2 className="text-2xl font-bold text-invoice-purple-800 mb-6">API Key de Prueba</h2>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              value={formData.api_key}
              onChange={(e) => handleChange("api_key", e.target.value)}
              className="input-animated font-mono text-sm"
              placeholder="Ingrese su API key"
            />
            <p className="text-sm text-invoice-purple-500 mt-1">
              API key pre-configurada para pruebas
            </p>
          </div>
        </div>

        <div className="form-card">
          <h2 className="text-2xl font-bold text-invoice-purple-800 mb-6">Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customer-id">ID del Cliente</Label>
              <Input
                id="customer-id"
                value={formData.customer}
                onChange={(e) => handleChange("customer", e.target.value)}
                className="input-animated"
                placeholder="ID del cliente"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">RFC del Cliente</Label>
              <Input
                id="tax-id"
                value={formData.tax_id}
                onChange={(e) => handleChange("tax_id", e.target.value)}
                className="input-animated"
                placeholder="RFC del cliente"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-card">
          <h2 className="text-2xl font-bold text-invoice-purple-800 mb-6">Información de la Factura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tax-system">Sistema de Impuestos</Label>
              <Select 
                value={formData.tax_system} 
                onValueChange={(value) => handleChange("tax_system", value)}
              >
                <SelectTrigger id="tax-system" className="select-animated">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="601">General de Ley Personas Morales</SelectItem>
                  <SelectItem value="603">Personas Morales con Fines no Lucrativos</SelectItem>
                  <SelectItem value="605">Sueldos y Salarios e Ingresos Asimilados a Salarios</SelectItem>
                  <SelectItem value="606">Arrendamiento</SelectItem>
                  <SelectItem value="608">Demás ingresos</SelectItem>
                  <SelectItem value="609">Consolidación</SelectItem>
                  <SelectItem value="610">Residentes en el Extranjero sin Establecimiento Permanente en México</SelectItem>
                  <SelectItem value="611">Ingresos por Dividendos (socios y accionistas)</SelectItem>
                  <SelectItem value="612">Personas Físicas con Actividades Empresariales y Profesionales</SelectItem>
                  <SelectItem value="614">Ingresos por intereses</SelectItem>
                  <SelectItem value="616">Sin obligaciones fiscales</SelectItem>
                  <SelectItem value="620">Sociedades Cooperativas de Producción que optan por diferir sus ingresos</SelectItem>
                  <SelectItem value="621">Incorporación Fiscal</SelectItem>
                  <SelectItem value="622">Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras</SelectItem>
                  <SelectItem value="623">Opcional para Grupos de Sociedades</SelectItem>
                  <SelectItem value="624">Coordinados</SelectItem>
                  <SelectItem value="625">Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas</SelectItem>
                  <SelectItem value="626">Régimen Simplificado de Confianza</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invoice-type">Tipo de Factura</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger id="invoice-type" className="select-animated">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">Ingreso</SelectItem>
                  <SelectItem value="E">Egreso</SelectItem>
                  <SelectItem value="T">Traslado</SelectItem>
                  <SelectItem value="N">Nómina</SelectItem>
                  <SelectItem value="P">Pago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Método de Pago</Label>
              <Select 
                value={formData.payment_method} 
                onValueChange={(value) => handleChange("payment_method", value)}
              >
                <SelectTrigger id="payment-method" className="select-animated">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUE">Pago en una sola exhibición</SelectItem>
                  <SelectItem value="PPD">Pago en parcialidades o diferido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-form">Forma de Pago</Label>
              <Select 
                value={formData.payment_form} 
                onValueChange={(value) => handleChange("payment_form", value)}
              >
                <SelectTrigger id="payment-form" className="select-animated">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">Efectivo</SelectItem>
                  <SelectItem value="02">Cheque nominativo</SelectItem>
                  <SelectItem value="03">Transferencia electrónica de fondos</SelectItem>
                  <SelectItem value="04">Tarjeta de crédito</SelectItem>
                  <SelectItem value="05">Monedero electrónico</SelectItem>
                  <SelectItem value="06">Dinero electrónico</SelectItem>
                  <SelectItem value="08">Vales de despensa</SelectItem>
                  <SelectItem value="12">Dación en pago</SelectItem>
                  <SelectItem value="13">Pago por subrogación</SelectItem>
                  <SelectItem value="14">Pago por consignación</SelectItem>
                  <SelectItem value="15">Condonación</SelectItem>
                  <SelectItem value="17">Compensación</SelectItem>
                  <SelectItem value="23">Novación</SelectItem>
                  <SelectItem value="24">Confusión</SelectItem>
                  <SelectItem value="25">Remisión de deuda</SelectItem>
                  <SelectItem value="26">Prescripción o caducidad</SelectItem>
                  <SelectItem value="27">A satisfacción del acreedor</SelectItem>
                  <SelectItem value="28">Tarjeta de débito</SelectItem>
                  <SelectItem value="29">Tarjeta de servicios</SelectItem>
                  <SelectItem value="30">Aplicación de anticipos</SelectItem>
                  <SelectItem value="31">Intermediario pagos</SelectItem>
                  <SelectItem value="99">Por definir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invoice-date">Fecha de Emisión</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal select-animated",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    {formData.date ? (
                      format(formData.date, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleChange("date", date || new Date())}
                    initialFocus
                    locale={es}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-invoice-purple-800">Ítems de la Factura</h2>
            <Button 
              type="button" 
              onClick={handleAddItem}
              className="bg-invoice-purple-600 hover:bg-invoice-purple-700 text-white transition-all duration-300 hover:shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" /> Agregar Ítem
            </Button>
          </div>
          
          <AnimatePresence>
            {formData.items.map((item, index) => (
              <InvoiceItemForm
                key={index}
                index={index}
                item={item}
                onChange={handleItemChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="sticky bottom-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-invoice-purple-600 to-invoice-orange-500 hover:from-invoice-purple-700 hover:to-invoice-orange-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 button-glow group"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="mr-2 animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
                Generando...
              </span>
            ) : (
              <span className="flex items-center">
                Generar Factura
                <Check className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </span>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default InvoiceForm;
