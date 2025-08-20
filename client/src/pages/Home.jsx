import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../components/Header";
import AddInvoice from "../components/AddInvoice";
import Invoices from "../components/Invoices";
import { getAllInvoice, deleteInvoice } from "../services/api";
import { styled } from "@mui/material/styles";
const Home = () => {
  const [addInvoice, setAddInvoice] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllInvoice();
      setInvoices(response.data);
    };
    getData();
  }, [addInvoice]);

  const toggleInvoice = () => {
    setAddInvoice(true);
  };

  const removeInvoice = async (id) => {
    await deleteInvoice(id);

    const updatedInvoice = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoice);
  };

  const HeaderContainer = styled(Box)(({ theme }) => ({
    marginBottom: "28px",
    // padding: "24px",
    // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    // borderRadius: "16px",
    // border: "1px solid rgba(0, 0, 0, 0.05)",
  }));

  return (
    <>
      <Header />
      <Box style={{ margin: 20 }}>
        <HeaderContainer style={{ marginLeft: 10 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#1565c0",
              textShadow: "0 2px 4px rgba(21, 101, 192, 0.2)",
            }}
          >
            Pending Invoices
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#546e7a",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Stay updated on all pending and overdue invoices!
          </Typography>
        </HeaderContainer>
        {/* {!addInvoice && (
          <Button
            variant="contained"
            style={{ marginTop: 1, marginBottom: 15 }}
            onClick={() => toggleInvoice()}
          >
            Add Invoice
          </Button>
        )} */}
        {addInvoice && <AddInvoice setAddInvoice={setAddInvoice} />}
        <Box>
          <Invoices invoices={invoices} removeInvoice={removeInvoice} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
