import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Chip,
  Avatar,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  maxWidth: "100%",
  margin: "20px auto",
  [theme.breakpoints.down("md")]: {
    margin: "10px auto",
    borderRadius: "8px",
  },
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
    [theme.breakpoints.down("md")]: {
      padding: "12px 8px",
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 6px",
      fontSize: "0.7rem",
    },
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
  [theme.breakpoints.down("md")]: {
    "&:hover": {
      transform: "none",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "14px 16px",
  borderBottom: "1px solid rgba(224, 224, 224, 0.3)",
  fontSize: "0.9rem",
  transition: "all 0.2s ease",
  [theme.breakpoints.down("md")]: {
    padding: "12px 8px",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 6px",
    fontSize: "0.75rem",
  },
}));

const VendorCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  [theme.breakpoints.down("sm")]: {
    gap: "8px",
  },
}));

const AmountText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  background: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 1px 2px rgba(46, 125, 50, 0.15)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

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
  [theme.breakpoints.down("md")]: {
    padding: "6px 12px",
    fontSize: "0.75rem",
    "&:hover": {
      transform: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "4px 8px",
    fontSize: "0.7rem",
    minWidth: "auto",
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
  [theme.breakpoints.down("sm")]: {
    padding: "8px 16px",
    fontSize: "0.8rem",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
}));

const CenteredButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const MobileInvoiceCard = styled(Card)(({ theme }) => ({
  marginBottom: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.12)",
  },
}));

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      const response = await getAllInvoice();
      setInvoices(response.data);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const renderMobileView = () => (
    <Box sx={{ padding: { xs: "10px", sm: "15px" } }}>
      {invoices && Array.isArray(invoices) && invoices.length > 0 ? (
        invoices.map((invoice, index) => (
          <MobileInvoiceCard key={invoice.id || index}>
            <CardContent sx={{ padding: "16px !important" }}>
              <Stack spacing={2}>
                {/* Header with Vendor and Amount */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <VendorCell>
                    <Avatar
                      sx={{
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        background:
                          "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        fontWeight: 600,
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
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
                          fontSize: { xs: "0.85rem", sm: "0.9rem" },
                        }}
                      >
                        {invoice.vendor}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#718096",
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        }}
                      >
                        {invoice.date}
                      </Typography>
                    </Box>
                  </VendorCell>
                  <AmountText
                    variant="h6"
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    {invoice.amount}
                  </AmountText>
                </Box>

                <Divider sx={{ opacity: 0.3 }} />

                {/* Product and Status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "#2d3748",
                      fontSize: { xs: "0.8rem", sm: "0.85rem" },
                    }}
                  >
                    {invoice.product}
                  </Typography>
                  <Chip
                    label={invoice.action}
                    {...getStatusProps(invoice.action)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      minWidth: { xs: "70px", sm: "80px" },
                      height: "24px",
                    }}
                  />
                </Box>

                {/* Action Button */}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}
                >
                  <StyledButton
                    variant="contained"
                    onClick={() => removeInvoice(invoice.id)}
                    size="small"
                  >
                    Mark Done
                  </StyledButton>
                </Box>
              </Stack>
            </CardContent>
          </MobileInvoiceCard>
        ))
      ) : (
        <Card sx={{ textAlign: "center", py: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1565c0",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              No Pending Invoices
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderTableView = () => (
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
                        width: { xs: 32, sm: 36, md: 40 },
                        height: { xs: 32, sm: 36, md: 40 },
                        background:
                          "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        fontWeight: 600,
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
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
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "0.95rem",
                          },
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
                      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
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
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
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
                      fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" },
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      minWidth: { xs: "70px", sm: "80px", md: "90px" },
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      height: { xs: "20px", sm: "22px", md: "24px" },
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
                    padding: { xs: "15px", sm: "20px" },
                    textShadow: "0 1px 2px rgba(11, 101, 192, 0.15)",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
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
  );

  return (
    <Box
      sx={{
        minHeight: "auto",
        padding: { xs: "10px", sm: "15px", md: "20px" },
        backgroundColor: "#f4f6f8",
      }}
    >
      {isMobile ? renderMobileView() : renderTableView()}

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
