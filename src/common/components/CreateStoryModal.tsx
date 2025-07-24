import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useCreateStory } from "../../features/home/hooks/useCreateStory";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { useFormik } from "formik";
import { createStoryValidationSchema } from "../../features/home/validations/createStoryValidationSchema";
import { getUserIdFromToken } from "../../utils/jwt.utils";
import FormikTextField from "./FormikTextField";

interface ICreateStoryFields {
  caption?: string;
  isVisibleToClosedOnes: boolean;
}

const createStoryInitialValues: ICreateStoryFields = {
  caption: "",
  isVisibleToClosedOnes: false,
};

const CreateStoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [storyFile, setStoryFile] = useState<File | null>(null);
  //   const [caption, setCaption] = useState("");
  //   const [isVisibleToClosedOnes, setIsVisibleToClosedOnes] = useState(false);

  const { mutate: createStory } = useCreateStory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoryFile(file);
    }
  };

  const handleSubmit = () => {
    if (!storyFile) {
      toast.error("Please select an image or video.");
      return;
    }

    const formData = new FormData();
    const loggedInUserId = getUserIdFromToken();
    formData.append("PostedByUserId", loggedInUserId.toString());
    formData.append("Story", storyFile);
    formData.append("Caption", formik.values.caption ?? "");
    // if (musicUrl) formData.append("MusicUrl", musicUrl);
    formData.append("IsVisibleToClosedOnes", formik.values.isVisibleToClosedOnes.toString());

    createStory(formData, {
      onSuccess: () => {
        toast.success("Story posted successfully!");
        handleClose();
      },
    });
  };

  const formik = useFormik({
    initialValues: createStoryInitialValues,
    validationSchema: createStoryValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    onClose();
    setStoryFile(null);
    formik.values.caption = "";
    formik.values.isVisibleToClosedOnes = false;
    // setIsVisibleToClosedOnes(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="text-center text-xl font-semibold">
        Create Story
      </DialogTitle>

      <DialogContent className="flex flex-col items-center gap-4 py-6">
        {/* File Upload Preview */}
        {storyFile ? (
          <div className="w-36 h-36 rounded-full overflow-hidden shadow border">
            {storyFile.type.startsWith("video") ? (
              <video
                src={URL.createObjectURL(storyFile)}
                className="object-cover w-full h-full"
                controls
              />
            ) : (
              <img
                src={URL.createObjectURL(storyFile)}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            )}
          </div>
        ) : (
          <label className="w-36 h-36 flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer text-gray-400 hover:text-black hover:border-black">
            <Upload size={32} />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}

        {/* Inputs */}
        {/* <TextField
          label="Caption"
          variant="outlined"
          fullWidth
          size="small"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        /> */}

        <FormikTextField
          type="text"
          label="Caption"
          name="caption"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.caption && formik.errors.caption}
          value={formik.values.caption ?? ""}
          error={formik.touched.caption && Boolean(formik.errors.caption)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.isVisibleToClosedOnes}
              //   onChange={(e) => setIsVisibleToClosedOnes(e.target.checked)}
              onChange={formik.handleChange}
              value={formik.values.isVisibleToClosedOnes}
              onBlur={formik.handleBlur}
              name="isVisibleToClosedOnes"
            />
          }
          label="Visible to close friends only"
        />
      </DialogContent>

      <DialogActions className="px-6 pb-4">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {/* {isLoading ? "Posting..." : "Post"} */}
          Post Story
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStoryModal;
