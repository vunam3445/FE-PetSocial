import { useParams } from "react-router-dom";
import { Header } from "../components/atoms/Header";
import { CoverImage } from "../components/atoms/CoverImage";
import { useEffect, useState } from "react";

import { PetHealthSidebar } from "../components/PetHealth/PetHealthSidebar";
import { PetSidebarSkeleton } from "../components/skeleton/PetSidebarSkeleton";
import { MainContentTabs } from "../components/PetHealth/MainContentTabs";
import { PostsTab } from "../components/PetHealth/PostsTab";
import { HealthDashboardTab } from "../components/PetHealth/HealthDashboardTab";
import { AddCategoryModal } from "../components/PetHealth/AddCategoryModal";
import { AddLogModal } from "../components/PetHealth/AddLogModal";
import { usePet } from "../hooks/pet/usePet";
import { usePetHealth } from "../hooks/pet/usePetHealth";
import { useCreatePetHealthLog } from "../hooks/pet/useCreatePetHealthLog";
import { useCreateHealthLog } from "../hooks/pet/useCreateHealthLog";
import ComfirmDeleteModal from "../components/modals/ComfirmDeleteModal";
import { useDeleteHealthCategory } from "../hooks/pet/useDeleteHealthCategory";
import { useUpdateHealthCategory } from "../hooks/pet/useUpdateHealthCategory";
import { EditCategoryModal } from "../components/PetHealth/EditCategoryModal";
import { useAllPostOfPet } from "../hooks/pet/useAllPostOfPet";
import type { HealthCategory } from "../types/Pet";

type ActiveTab = "posts" | "health";

export const PetHealth = () => {
  const [coverUpdate, setCoverUpdate] = useState<string>("");
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const { fetchPetInfo } = usePet();

  useEffect(() => {
    const loadPetInfo = async () => {
      if (!id) {
        console.warn("⚠️ ID is missing, not fetching");
        return;
      }
      try {
        setLoading(true);
        const petInfo = await fetchPetInfo(id);
        setPetInfo(petInfo);
      } catch (err) {
        console.error("❌ Fetch pet info failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPetInfo();
  }, [id]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const {
    healthData,
    loading: healthLoading,
    error: healthError,
    refetch,
  } = usePetHealth(id, activeTab === "health");
  const {
    createHealthCategory,
    loading: createHealthCategoryLoading,
    error: createHealthCategoryError,
  } = useCreateHealthLog();
  const {
    createPetLog,
    loading: createPetLoading,
    error: createPetLogError,
  } = useCreatePetHealthLog();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [currentLogCategory, setCurrentLogCategory] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );
  const [currentCategoryData, setCurrentCategoryData] =
    useState<HealthCategory | null>(null);
  const {
    deleteCategory,
    loading: deletingCategory,
    error: deleteError,
  } = useDeleteHealthCategory();
  const {
    updateCategory,
    loading: updatingCategory,
    error: updateError,
  } = useUpdateHealthCategory();
 

  const handleOpenLogModal = (
    categoryName: string,
    categoryType: string,
    categoryId: string
  ) => {
    setCurrentLogCategory(categoryName);
    setCurrentCategoryId(categoryId);
    setCategoryType(categoryType);
    setIsLogModalOpen(true);
  };
  const handleSaveLog = async (data: any) => {
    try {
      data.pet_id = id;
      data.category_id = currentCategoryId;
      await createPetLog(data);
      refetch();
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const handleCreateCategory = async (data: any) => {
    try {
      setIsCategoryModalOpen(false);
      data.pet_id = id;
      await createHealthCategory(data);
      refetch();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handlyDeleteCategory = async () => {
    if (!currentCategoryId) return;
    try {
      setIsConfirmDeleteModalOpen(false);
      const result = await deleteCategory(currentCategoryId);
      if (result) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (categoryId: string, data: any) => {
    try {
      setIsEditCategoryModalOpen(false);
      await updateCategory(categoryId, data);
      refetch();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-6xl px-5 mx-auto mt-16">
        <div className="relative">
          <CoverImage
            imageURL={
              petInfo?.avatar_url ||
              "http://127.0.0.1:8000/storage/pets/default.jpg"
            }
            onChange={(newCoverUrl) => setCoverUpdate(newCoverUrl)}
          />
        </div>

        <div className="pt-5">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {loading ? (
                <PetSidebarSkeleton />
              ) : petInfo ? (
                <PetHealthSidebar pet={petInfo} />
              ) : (
                <div className="p-4 text-gray-500 bg-white shadow rounded-2xl">
                  Không tìm thấy thông tin thú cưng.
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
                <MainContentTabs
                  activeTab={activeTab}
                  onTabClick={setActiveTab}
                />

                <div className="p-8">
                  {activeTab === "posts" && <PostsTab/>}
                  {activeTab === "health" && (
                    <HealthDashboardTab
                      species={petInfo?.type}
                      healthData={healthData}
                      loading={healthLoading}
                      onOpenLogModal={handleOpenLogModal}
                      onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
                      onDeleteCategory={(categoryId: string) => {
                        setCurrentCategoryId(categoryId);
                        setIsConfirmDeleteModalOpen(true);
                      }}
                      onOpenEditCategory={(categoryId: string) => {
                        setCurrentCategoryId(categoryId);
                        setIsEditCategoryModalOpen(true);
                        const categoryData = healthData?.find(
                          (cat) => cat.category_id === categoryId
                        );
                        setCurrentCategoryData(categoryData);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCategoryModal // thêm category
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCreateCategory={handleCreateCategory}
      />
      <AddLogModal //thêm log cho category
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        categoryName={currentLogCategory}
        categoryType={categoryType}
        onSaveLog={handleSaveLog}
        isSaving={createPetLoading}
      />
      <ComfirmDeleteModal
        open={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handlyDeleteCategory}
      />
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        onUpdateCategory={handleUpdateCategory}
        initialData={currentCategoryData}
      />
    </div>
  );
};
