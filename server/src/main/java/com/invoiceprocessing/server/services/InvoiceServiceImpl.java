package com.invoiceprocessing.server.services;

import com.invoiceprocessing.server.dao.InvoiceDao;
import com.invoiceprocessing.server.model.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService{

    @Autowired
    InvoiceDao invoiceDao;

    @Override
    public Invoice addInvoice(Invoice invoice) {
        boolean exists = invoiceDao.existsByVendorAndAmount(invoice.getVendor(), invoice.getAmount());

        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Duplicate invoice: Vendor and Amount already exist!");
        }


        return invoiceDao.save(invoice);
    }


    @Override
    public List<Invoice> getInvoices() {
        return invoiceDao.findAll() ;
    }

    @Override
    public Invoice deleteInvoice(long id) {
       Invoice invoice = invoiceDao.findById(id).get();
       invoiceDao.delete(invoice);
       return invoice;
    }
}
