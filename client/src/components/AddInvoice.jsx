import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { saveInvoice } from "../services/api";
import { User, Package, IndianRupee, Calendar, X, Receipt } from "lucide-react";

const ModalBackdrop = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
  padding: "20px",
});

const Component = styled(Box)({
  width: "100%",
  maxWidth: "680px",
  maxHeight: "90vh",
  overflowY: "auto",
  margin: "0 auto",
  padding: 0,
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  position: "relative",
  outline: "none",

  "& .modal-header": {
    padding: "32px 32px 24px 32px",
    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
    borderRadius: "24px 24px 0 0",
    position: "relative",
    color: "white",

    "& .header-content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& .title-section": {
        display: "flex",
        alignItems: "center",
        gap: "12px",

        "& .icon-container": {
          padding: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        "& .header": {
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: 0,
          background: "none",
          backgroundClip: "unset",
          WebkitBackgroundClip: "unset",
          WebkitTextFillColor: "white",
          textAlign: "left",
          paddingBottom: 0,
          border: "none",
        },
      },

      "& .close-button": {
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transform: "scale(1.1)",
        },

        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
          transform: "none",
        },
      },
    },

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "4px",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 100%)",
    },
  },

  "& .modal-body": {
    padding: "32px",

    "& .form-container": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "28px",
      alignItems: "end",

      "& .field-container": {
        position: "relative",
        marginRight: 0,
        minWidth: "auto",

        "& .field-label": {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#37474f",

          "& .field-icon": {
            color: "#1976d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },

        "& .MuiInputLabel-root": {
          color: "#546e7a",
          fontWeight: 600,
          fontSize: "0.9rem",
        },

        "& .MuiInput-root": {
          fontSize: "1rem",
          fontWeight: 500,
          padding: "12px 0",
          backgroundColor: "rgba(25, 118, 210, 0.02)",
          borderRadius: "8px 8px 0 0",
          paddingLeft: "12px",
          paddingRight: "12px",
          transition: "all 0.3s ease",

          "&:before": {
            borderBottomColor: "rgba(25, 118, 210, 0.3)",
            borderBottomWidth: "2px",
          },

          "& input": {
            padding: "12px 0 8px 0",
            transition: "all 0.3s ease",

            "&:focus": {
              backgroundColor: "rgba(25, 118, 210, 0.02)",
            },

            "&::placeholder": {
              color: "#90a4ae",
              opacity: 1,
              fontWeight: 500,
            },
          },

          "&:after": {
            borderBottomColor: "#1976d2",
            borderBottomWidth: "3px",
          },

          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#1976d2",
            borderBottomWidth: "2px",
          },

          "&.Mui-focused": {
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        },
      },
    },
  },

  "& .modal-footer": {
    padding: "24px 32px 32px 32px",
    backgroundColor: "#f8f9fa",
    borderRadius: "0 0 24px 24px",
    borderTop: "1px solid rgba(0, 0, 0, 0.06)",

    "& .button-container": {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 0,
      gap: "16px",

      "& button": {
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        borderRadius: "16px",
        padding: "14px 28px",
        fontWeight: 600,
        fontSize: "0.9rem",
        textTransform: "none",
        boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        minWidth: "140px",
        minHeight: "48px",

        "&:hover": {
          background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
        },

        "&:active": {
          transform: "translateY(-1px)",
        },

        "&.cancel-button": {
          background: "#ffffff",
          color: "#546e7a",
          border: "2px solid #e0e0e0",
          boxShadow: "none",

          "&:hover": {
            background: "#f5f5f5",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        },

        "&:disabled": {
          opacity: 0.7,
          transform: "none",
          cursor: "not-allowed",
        },
      },
    },
  },
});

const defaultObj = {
  vendor: "",
  product: "",
  amount: 0,
  date: "",
  action: "pending",
};

const AddInvoice = ({ setAddInvoice, open = true }) => {
  const [invoice, setInvoice] = useState(defaultObj);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const onValueChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const addNewInvoice = async () => {
    setLoading(true);
    try {
      await saveInvoice({ ...invoice, amount: Number(invoice["amount"]) });
      setInvoice(defaultObj);
      setAddInvoice(false);
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInvoice(defaultObj);
    setAddInvoice(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <Component onClick={(e) => e.stopPropagation()}>
        <Box className="modal-header">
          <Box className="header-content">
            <Box className="title-section">
              <Box className="icon-container">
                <Receipt size={20} />
              </Box>
              <Typography className="header">Add New Invoice</Typography>
            </Box>
            <button
              className="close-button"
              onClick={handleClose}
              disabled={loading}
            >
              <X size={20} />
            </button>
          </Box>
        </Box>

        <Box className="modal-body">
          <Box className="form-container">
            <Box className="field-container">
              <Box className="field-label">
                <span className="field-icon">
                  <User size={16} />
                </span>
                <span>Vendor Name</span>
              </Box>
              <TextField
                variant="standard"
                placeholder="Enter vendor name"
                onChange={(e) => onValueChange(e)}
                name="vendor"
                value={invoice.vendor}
                fullWidth
                disabled={loading}
                autocomplete="off"
              />
            </Box>

            <Box className="field-container">
              <Box className="field-label">
                <span className="field-icon">
                  <Package size={16} />
                </span>
                <span>Product Name</span>
              </Box>
              <TextField
                variant="standard"
                placeholder="Enter product name"
                onChange={(e) => onValueChange(e)}
                name="product"
                value={invoice.product}
                fullWidth
                disabled={loading}
                autocomplete="off"
              />
            </Box>

            <Box className="field-container">
              <Box className="field-label">
                <span className="field-icon">
                  <IndianRupee size={16} />
                </span>
                <span>Amount</span>
              </Box>
              <TextField
                variant="standard"
                placeholder="Enter amount(in Rs.)"
                type="number"
                onChange={(e) => onValueChange(e)}
                name="amount"
                value={invoice.amount}
                fullWidth
                disabled={loading}
                autocomplete="off"
              />
            </Box>

            <Box className="field-container">
              <Box className="field-label">
                <span className="field-icon">
                  <Calendar size={16} />
                </span>
                <span>Invoice Date</span>
              </Box>
              <TextField
                variant="standard"
                placeholder="Enter date"
                type="date"
                onChange={(e) => onValueChange(e)}
                name="date"
                value={invoice.date}
                               fullWidth
                disabled={loading}
                autocomplete="off"
              />
            </Box>
          </Box>
        </Box>

        <Box className="modal-footer">
          <Box className="button-container">
            <Button
              variant="outlined"
              className="cancel-button"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => addNewInvoice()}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Invoice"}
            </Button>
          </Box>
        </Box>
      </Component>
    </ModalBackdrop>
  );
};

export default AddInvoice;
