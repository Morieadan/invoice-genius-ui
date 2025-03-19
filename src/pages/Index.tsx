
import React from "react";
import InvoiceForm from "@/components/InvoiceForm";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-invoice-purple-700 via-invoice-purple-600 to-invoice-orange-500 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Generador de Facturas
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-invoice-purple-700 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crea facturas electrónicas de forma fácil y rápida con nuestra intuitiva interfaz.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-invoice-purple-100 to-invoice-orange-100 flex items-center justify-center animate-float shadow-lg">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowDown className="h-8 w-8 text-invoice-purple-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-invoice-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-invoice-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
      </header>

      {/* Form Section */}
      <section className="py-12 px-6">
        <InvoiceForm />
      </section>
    </div>
  );
};

export default Index;
