import React, { useState, useEffect } from "react";

import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { getAllBlogCategories, getBlogCategoryByBlogId } from "../../../utils/BlogCategoryService";
import { saveBlog, updateBlogByBlogId } from "../../../utils/BlogService";

const BlogForm = ({ onSave, initialBlog }) => {
  const [blog, setBlog] = useState({
    blogCategoryId: "",
    title: "",
    shortDescription: "",
    content: "",
    publishDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
  });
  const [blogCategories, setBlogCategories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllBlogCategories();
        setBlogCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBlogData = async () => {
      if (initialBlog) {
        try {
          const categoryResponse = await getBlogCategoryByBlogId(initialBlog.blogId);
          const publishDate = new Date(
            new Date(initialBlog.publishDate).getTime() + 7 * 60 * 60 * 1000
          )
            .toISOString()
            .slice(0, 16);
          setBlog({
            ...initialBlog,
            blogCategoryId: categoryResponse.data.blogCategoryId || "",
            publishDate: publishDate,
          });
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      }
    };

    fetchCategories();
    fetchBlogData();
  }, [initialBlog]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value || "",
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: data,
    }));
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("authToken");
    const blogCategoryId = blogCategories.find(
      (blogCategory) => blogCategory.blogCategoryId === blog.blogCategoryId
    )?.blogCategoryId;
    
    const formData = new FormData();
    const formData2 = new FormData();
    formData.append("title", blog.title);
    formData.append("shortDescription", blog.shortDescription);
    formData.append("content", blog.content);
    formData.append("publishDate", blog.publishDate);
    formData.append("file", file);

    if (file) {
      formData2.append("title", blog.title);
      formData2.append("shortDescription", blog.shortDescription);
      formData2.append("content", blog.content);
      formData2.append("publishDate", blog.publishDate);
      formData2.append("file", file);
      formData2.append("imageUrl", blog.imageUrl);
    } else if (initialBlog) {
      formData2.append("title", blog.title);
      formData2.append("shortDescription", blog.shortDescription);
      formData2.append("content", blog.content);
      formData2.append("publishDate", blog.publishDate);
      formData2.append("imageUrl", blog.imageUrl);
    }

    try {
      if (initialBlog) {
        await updateBlogByBlogId(token, formData2, initialBlog.blogId, blogCategoryId);
      } else {
        await saveBlog(token, formData, blogCategoryId);
      }
      onSave();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Tiêu đề"
            variant="outlined"
            fullWidth
            value={blog.title || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "18px",
            }}
          >
            Ảnh bìa bài viết:
          </div>
        </Grid>
        <Grid item xs={9}>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Thả tệp vào đây...</p>
            ) : (
              <p>Kéo và thả tệp vào đây hoặc nhấp để chọn tệp</p>
            )}
          </div>
          {file && <p>Đã chọn tệp: {file.name}</p>}
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              name="blogCategoryId"
              value={blog.blogCategoryId || ""}
              onChange={handleChange}
              label="Danh mục"
              required
            >
              {blogCategories.map((blogCategory) => (
                <MenuItem
                  key={blogCategory.blogCategoryId}
                  value={blogCategory.blogCategoryId}
                >
                  {blogCategory.blogCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="shortDescription"
            label="Miêu tả sơ lược"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={blog.shortDescription || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CKEditor
            editor={ClassicEditor}
            data={blog.content || ""}
            onChange={handleEditorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="publishDate"
            label="Ngày đăng"
            variant="outlined"
            fullWidth
            type="datetime-local"
            value={blog.publishDate || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialBlog ? "Cập Nhật" : "Thêm"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
