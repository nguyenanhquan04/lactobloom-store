import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import Cookies from 'js-cookie';

const VoucherForm = ({ onSave, initialVoucher }) => {
  const [voucher, setVoucher] = useState({
    point: '',
    discount: '',
    expirationDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
    available: 'true'
  });

  useEffect(() => {
    if (initialVoucher) {
      const expirationDate = new Date(new Date(initialVoucher.expirationDate).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
      setVoucher({
        ...initialVoucher,
        expirationDate: expirationDate
      });
    }
  }, [initialVoucher]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('authToken');
    const url = initialVoucher 
      ? `http://localhost:8080/voucher/update/${initialVoucher.voucherId}`
      : 'http://localhost:8080/voucher/save';

    const voucherData = {
      point: voucher.point,
      discount: voucher.discount,
      expirationDate: voucher.expirationDate,
      available: voucher.available
    };

    try {
      if (initialVoucher) {
        await axios.put(url, voucherData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(url, voucherData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving voucher:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="point"
            label="Point"
            variant="outlined"
            fullWidth
            value={voucher.point || ''}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="discount"
            label="Discount (%)"
            variant="outlined"
            fullWidth
            value={voucher.discount || ''}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="expirationDate"
            label="Expiration Date"
            variant="outlined"
            fullWidth
            type="datetime-local"
            value={voucher.expirationDate || ''}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Available</InputLabel>
            <Select
              name="available"
              value={voucher.available}
              onChange={handleChange}
              label="Available"
              required
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialVoucher ? 'Update Voucher' : 'Add Voucher'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VoucherForm;
