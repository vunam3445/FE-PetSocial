import React, { useState } from "react";
import { HealthCard } from "./HealthCard";
import type { HealthCategory } from "../../types/Pet";
import { Box, Modal, IconButton } from "@mui/material"; // Thêm Modal và IconButton
import CloseIcon from "@mui/icons-material/Close"; // Cần cài @mui/icons-material nếu chưa có

interface FeatherConditionCardProps {
  healthLogs?: HealthCategory;
  onOpenLogModal: (category: string) => void;
  onDeleteCategory: () => void;
  onViewLogsList?: (category: HealthCategory) => void;
  onEdit?: () => void;
  isOwner: boolean;
}

export const FeatherConditionCard: React.FC<FeatherConditionCardProps> = ({
  healthLogs,
  onOpenLogModal,
  onDeleteCategory,
  onViewLogsList,
  onEdit,
  isOwner,
}) => {
  // State để quản lý Modal xem ảnh
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleOpenImage = (url: string) => setSelectedImg(url);
  const handleCloseImage = () => setSelectedImg(null);

  return (
    <>
      <HealthCard
        isOwner={isOwner}
        title={healthLogs?.name || "Tình trạng Lông & Da"}
        onAddLog={() => onOpenLogModal(healthLogs?.name || "Tình trạng Lông & Da")}
        onDeleteCategory={onDeleteCategory}
        onViewLogs={() => healthLogs && onViewLogsList && onViewLogsList(healthLogs)}
        onEdit={onEdit}
      >
        <div className="space-y-6">
          {healthLogs?.health_logs?.map((log, index) => {
            const isLongDescription = (log.description?.length || 0) > 150;
            return (
              <div key={index} className="pl-3 border-l-4 border-indigo-200">
                <div className="flex gap-3">
                  {/* 1. Phần Ảnh (bên trái) */}
                  {log.image_url && (
                    <Box
                      onClick={() => handleOpenImage(log.image_url!)} // Click để mở Modal
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: "1px solid #e0e0e0",
                        flexShrink: 0,
                        cursor: "pointer", // Thêm con trỏ tay
                        "&:hover": { opacity: 0.8, transition: "0.3s" },
                      }}
                    >
                      <img
                        src={log.image_url}
                        alt={log.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  )}

                  {/* 2. Phần Nội dung */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <p className="text-base font-semibold text-gray-800 break-words">
                        <span className="pr-1 text-sm font-medium text-blue-500">
                          {log.recorded_at}
                        </span>
                        {log.title}
                      </p>
                    </div>
                    {log.description && (
                      <div
                        className={`text-gray-600 bg-gray-50 p-2 rounded-md transition duration-300 ${
                          isLongDescription ? "max-h-24 overflow-y-auto" : ""
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{log.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {healthLogs?.health_logs?.length === 0 && (
            <p className="italic text-gray-500">Chưa có log.</p>
          )}
        </div>
      </HealthCard>

      {/* MODAL HIỂN THỊ ẢNH */}
      <Modal
        open={!!selectedImg}
        onClose={handleCloseImage}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.85)" }}
      >
        <Box sx={{ position: "relative", outline: "none", maxWidth: "90vw", maxHeight: "90vh" }}>
          {/* Nút đóng Modal */}
          <IconButton
            onClick={handleCloseImage}
            sx={{ position: "absolute", top: -40, right: -40, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          {/* Ảnh phóng to */}
          {selectedImg && (
            <img
              src={selectedImg}
              alt="Preview"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
                display: "block",
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};