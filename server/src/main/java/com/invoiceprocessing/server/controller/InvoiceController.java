package com.invoiceprocessing.server.controller;

import com.invoiceprocessing.server.model.Invoice;
import com.invoiceprocessing.server.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;

    @PostMapping("/invoice")
    public ResponseEntity<?> addInvoice(@RequestBody Invoice invoice) {
        try {
            Invoice savedInvoice = this.invoiceService.addInvoice(invoice);
            return ResponseEntity.ok(savedInvoice);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @GetMapping("/invoice")
    public List<Invoice> getInvoices(){
        return this.invoiceService.getInvoices();
    }

    @DeleteMapping("/invoice/{invoiceId}")
    public Invoice deleteInvoice(@PathVariable String invoiceId ){
        return this.invoiceService.deleteInvoice(Long.parseLong(invoiceId));
    }


}
