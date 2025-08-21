import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { saveInvoice } from "../services/api";
import { User, Package, IndianRupee, Calendar, X, Receipt } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  padding: "8px",

  "@media (max-width: 600px)": {
    padding: "4px",
  },
});

const Component = styled(Box)({
  width: "100%",
  maxWidth: "680px",
  maxHeight: "90vh",
  margin: "0 auto",
  padding: "0",
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  position: "relative",
  outline: "none",
  display: "flex",
  flexDirection: "column",

  "@media (max-width: 600px)": {
    maxWidth: "90%",
    margin: "8px",
    padding: "4px",
  },

  "& .modal-header": {
    padding: "16px 16px 12px 16px",
    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
    borderRadius: "24px 24px 0 0",
    position: "relative",
    color: "white",
    flexShrink: 0,

    "& .header-content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& .title-section": {
        display: "flex",
        alignItems: "center",
        gap: "8px",

        "& .icon-container": {
          padding: "8px",
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

          "@media (max-width: 600px)": {
            fontSize: "1.2rem",
          },
        },
      },

      "& .close-button": {
        padding: "6px",
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

        "@media (max-width: 600px)": {
          padding: "4px",
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
    padding: "16px",
    flexGrow: 1,
    overflowY: "hidden",

    "& .form-container": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      alignItems: "end",

      "@media (max-width: 600px)": {
        gridTemplateColumns: "1fr",
        gap: "12px",
      },

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

          "@media (max-width: 600px)": {
            padding: "8px 0",
            "& input": {
              padding: "8px 0 4px 0",
            },
          },
        },
      },
    },
  },

  "& .modal-footer": {
    padding: "12px 16px 16px 16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "0 0 24px 24px",
    borderTop: "1px solid rgba(0, 0, 0, 0.06)",
    flexShrink: 0,

    "& .button-container": {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "0",
      gap: "8px",

      "@media (max-width: 600px)": {
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-end",
      },

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

        "@media (max-width: 600px)": {
          minWidth: "100%",
          padding: "12px 16px",
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
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          error.response.data?.message || "Duplicate invoice detected!"
        );
        setSnackbarOpen(true);
      } else {
        setErrorMessage("Failed to save invoice.");
        setSnackbarOpen(true);
      }
    } finally {
      setLoading(false);
    }
    if (
      !invoice.vendor ||
      !invoice.product ||
      !invoice.amount ||
      !invoice.date
    ) {
      setErrorMessage("All fields are required");
      setSnackbarOpen(true);
      return;
    }
  };

  const handleClose = () => {
    setInvoice(defaultObj);
    setErrorMessage("");
    setSnackbarOpen(false);
    setAddInvoice(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (!open) return null;

  return (
    <ModalBackdrop>
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
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                required
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
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                required
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
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                required
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
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                required
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            width: "90%",
            maxWidth: "500px",
            "@media (max-width: 600px)": {
              width: "95%",
              maxWidth: "100%",
            },
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </ModalBackdrop>
  );
};

export default AddInvoice;
