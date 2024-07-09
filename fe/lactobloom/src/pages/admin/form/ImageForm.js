import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageForm = ({ open, onClose, product, onSave }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/image/get/product/${product.productId}`
        );
        setProductImages(response.data);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    if (product?.productId) {
      fetchProductImages();
    }
  }, [product]);

  const fetchProductImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/image/get/product/${product.productId}`
      );
      setProductImages(response.data);
    } catch (error) {
      console.error("Error fetching product images:", error);
    }
  };

  const handleSaveImage = async (index) => {
    const token = Cookies.get("authToken");
    try {
      if (index === null) {
        // Add new image
        await axios.post(
          `http://localhost:8080/image/save/product/${product.productId}`,
          { imageUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Update existing image
        const imageId = productImages[index].imageId;
        await axios.put(
          `http://localhost:8080/image/update/${imageId}/product/${product.productId}`,
          { imageUrl: productImages[index].imageUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      onSave(); // Call onSave to refresh the product list in the parent component
      fetchProductImages(); // Refetch the images
      setEditIndex(null); // Reset the edit index
    } catch (error) {
      console.error("Error saving product image:", error);
    }
  };

  const handleEditImage = (index) => {
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleAddNewImage = () => {
    setEditIndex(productImages.length);
    setImageUrl("");
  };

  const handleImageChange = (e, index) => {
    if (index === null) {
      setImageUrl(e.target.value);
    } else {
      const updatedImages = [...productImages];
      updatedImages[index].imageUrl = e.target.value;
      setProductImages(updatedImages);
    }
  };

  const handleDeleteImage = async () => {
    const token = Cookies.get("authToken");
    try {
      const imageId = productImages[deleteIndex].imageId;
      await axios.delete(`http://localhost:8080/image/delete/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(); // Call onSave to refresh the product list in the parent component
      fetchProductImages(); // Refetch the images
      setDeleteIndex(null); // Reset the delete index
    } catch (error) {
      console.error("Error deleting product image:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Product Image</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image URL</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productImages.map((img, index) => (
                <TableRow key={img.imageId}>
                  <TableCell>
                    <TextField
                      value={img.imageUrl}
                      onChange={(e) => handleImageChange(e, index)}
                      fullWidth
                      disabled={editIndex !== index}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={img.imageUrl}
                      alt="Product"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <>
                        <Button onClick={() => handleSaveImage(index)}>
                          Update
                        </Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditImage(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setDeleteIndex(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {editIndex === productImages.length && (
                <TableRow>
                  <TableCell>
                    <TextField
                      value={imageUrl}
                      onChange={(e) => handleImageChange(e, null)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSaveImage(null)}>Save</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleAddNewImage} style={{ marginTop: "20px" }}>
          Add New Image
        </Button>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Image"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteImage} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ImageForm;