import React, { useCallback, useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetUserHighlights } from "../../features/profile/hooks/useGetUserHighlights";
import { useCreateHighlights } from "../../features/profile/hooks/useCreateHighlights";
import { IHighlightUpsertPayload } from "../../features/profile/types/profile.payload.types";
import {
  IAddToHighlightsModalProps,
  IHighlight,
} from "../types/commonComponent.type";

const AddToHighlightsModal: React.FC<IAddToHighlightsModalProps> = ({
  open,
  onClose,
  storyId,
}) => {
  const [selectedHighlightId, setSelectedHighlightId] = useState<number | null>(
    null
  );

  const [highlightTitle, sethighlightTitle] = useState<string>("");

  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const { userId } = useParams<{ userId: string }>();

  const { data: highlights } = useGetUserHighlights(Number(userId));

  const { mutate: createHighlight, isPending } = useCreateHighlights();

  useEffect(() => {
    if (!open) {
      setSelectedHighlightId(null);
      sethighlightTitle("");
      setCreatingNew(false);
    }
  }, [open]);

  const handleAdd = useCallback(() => {
    if (creatingNew) {
      if (!highlightTitle.trim()) {
        toast.error("Title is required");
        return;
      }

      const payload: IHighlightUpsertPayload = {
        highlightId: 0,
        userId: Number(userId),
        title: highlightTitle.trim(),
        storyId: storyId,
        isDeleted: false,
      };

      createHighlight(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      if (selectedHighlightId === null) {
        toast.error("Please select a highlight to add the story.");
        return;
      }

      const payload: IHighlightUpsertPayload = {
        highlightId: selectedHighlightId,
        userId: Number(userId),
        title: highlightTitle.trim(),
        storyId: storyId,
        isDeleted: false,
      };

      createHighlight(payload, {
        onSuccess: () => {
          onClose();
        },
      });

      //   toast.success("Added to existing highlight (not implemented)");
      onClose();
    }
  }, [
    createHighlight,
    creatingNew,
    highlightTitle,
    onClose,
    selectedHighlightId,
    storyId,
    userId,
  ]);

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-6 w-80 flex flex-col gap-4 bg-white">
        <h2 className="text-lg font-semibold">Add to Highlight</h2>

        {!creatingNew && (
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {highlights?.map((h: IHighlight) => (
              <button
                key={h.highlightId}
                onClick={() => {
                  setSelectedHighlightId(h.highlightId);
                  sethighlightTitle(h.title);
                }}
                className={`p-2 border rounded ${
                  selectedHighlightId === h.highlightId ? "border-blue-500" : ""
                }`}
              >
                {h.title}
              </button>
            ))}
          </div>
        )}

        {creatingNew ? (
          <input
            type="text"
            placeholder="Highlight Title"
            value={highlightTitle}
            onChange={(e) => sethighlightTitle(e.target.value)}
            className="border p-2 rounded"
            disabled={isPending}
          />
        ) : (
          <button
            onClick={() => setCreatingNew(true)}
            className="text-blue-600 text-sm"
          >
            + Create new highlight
          </button>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-sm text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            disabled={isPending}
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddToHighlightsModal;
