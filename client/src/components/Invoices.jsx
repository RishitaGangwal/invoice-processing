import { useEffect, useState } from "react";
import Table from "@mui/material/Table" ;
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, Avatar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddInvoice from "./AddInvoice";
import { getAllInvoice, deleteInvoice } from "../services/api";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  marginBottom: "20px",
  maxWidth: "1200.px",
  margin: "20px auto",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
  "& .MuiTableCell-head": {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "16px",
    borderBottom: "none",
    textShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(25, 118, 210, 0.03)",
  },
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.06)",
    transform: "translateY(-1px)",
    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.12)",
    "& .MuiTableCell-root": {
      borderColor: "rgba(25, 118, 210, 0.08)",
    },
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "14px 16px",
  borderBottom: "1px solid rgba(224, 224, 224, 0.3)",
  fontSize: "0.9rem",
  transition: "all 0.2s ease",
}));

const VendorCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const AmountText = styled(Typography)({
  fontWeight: 700,
  fontSize: "1rem",
  background: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 1px 2px rgba(46, 125, 50, 0.15)",
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
  borderRadius: "10px",
  padding: "8px 20px",
  fontWeight: 600,
  fontSize: "0.85rem",
  textTransform: "none",
  boxShadow: "0 3px 15px rgba(76, 175, 80, 0.25)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #45a049 0%, #3e8e41 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.35)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}));

const AddInvoiceButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
  borderRadius: "10px",
  padding: "10px 24px",
  fontWeight: 600,
  fontSize: "0.9rem",
  textTransform: "none",
  boxShadow: "0 3px 15px rgba(25, 118, 210, 0.25)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.35)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}));

const CenteredButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px",
});

const getStatusProps = (action) => {
  const actionLower = action?.toLowerCase() || "";
  if (
    actionLower.includes("completed") ||
    actionLower.includes("done") ||
    actionLower.includes("approved")
  ) {
    return { color: "success", variant: "filled" };
  } else if (
    actionLower.includes("pending") ||
    actionLower.includes("review")
  ) {
    return { color: "warning", variant: "filled" };
  } else if (
    actionLower.includes("rejected") ||
    actionLower.includes("failed")
  ) {
    return { color: "error", variant: "filled" };
  } else {
    return { color: "primary", variant: "outlined" };
  }
};

const getVendorInitial = (vendor) => {
  return vendor ? vendor.charAt(0).toUpperCase() : "V";
};

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [addInvoice, setAddInvoice] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllInvoice();
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    getData();
  }, [addInvoice]);

  const toggleInvoice = () => {
    setAddInvoice(true);
  };

  const removeInvoice = async (id) => {
    try {
      await deleteInvoice(id);
      const response = await getAllInvoice(); // Refetch invoices after deletion
      setInvoices(response.data);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "auto", padding: "20px", backgroundColor: "#f4f6f8" }}>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {invoices && Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <StyledTableRow key={invoice.id || index}>
                  <StyledTableCell>
                    <VendorCell>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          fontWeight: 600,
                          fontSize: "1rem",
                          boxShadow: "0 3px 10px rgba(25, 118, 210, 0.2)",
                        }}
                      >
                        {getVendorInitial(invoice.vendor)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#1a202c",
                            fontSize: "0.95rem",
                          }}
                        >
                          {invoice.vendor}
                        </Typography>
                      </Box>
                    </VendorCell>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#2d3748",
                        fontSize: "0.9rem",
                      }}
                    >
                      {invoice.product}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <AmountText variant="h6">{invoice.amount}</AmountText>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#718096",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                      }}
                    >
                      {invoice.date}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Chip
                      label={invoice.action}
                      {...getStatusProps(invoice.action)}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        minWidth: "90px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <StyledButton
                      variant="contained"
                      onClick={() => removeInvoice(invoice.id)}
                    >
                      Mark Done
                    </StyledButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1565c0",
                      padding: "20px",
                      textShadow: "0 1px 2px rgba(11, 101, 192, 0.15)",
                      fontSize: "1.1rem",
                    }}
                  >
                    No Pending Invoices
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
        </TableBody>
      </Table>
    </StyledTableContainer>
    <CenteredButtonContainer>
      {!addInvoice && (
        <AddInvoiceButton variant="contained" onClick={toggleInvoice}>
          Add Invoice
        </AddInvoiceButton>
      )}
      {addInvoice && <AddInvoice setAddInvoice={setAddInvoice} />}
    </CenteredButtonContainer>
  </Box>
);
}