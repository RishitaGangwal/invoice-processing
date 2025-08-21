package com.invoiceprocessing.server.dao;

import com.invoiceprocessing.server.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface InvoiceDao extends JpaRepository<Invoice,Long> {

    boolean existsByVendorAndAmount(String vendor, int amount);

}
