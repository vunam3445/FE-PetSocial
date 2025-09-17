import { useSearchParams } from "react-router-dom";
import { Header } from "../components/atoms/Header";
import { CategorySidebar } from "../components/molecules/CategorySidebar";
import { useSearch } from "../hooks/search/useSearch";
import { ListPost } from "../components/molecules/ListPost";
import { UserSearchList } from "../components/molecules/UserSearchList";
import { PetSearchList } from "../components/molecules/PetSearchList";
import { SkeletonCard } from "../components/skeleton/SkeletonCard";
import { PostSkeleton } from "../components/skeleton/PostSkeleton";
export const SearchPage = () => {
  const [params, setParams] = useSearchParams();

  // lấy type và keyword từ URL
  const type =
    (params.get("type") as
      | "post"
      | "user"
      | "pet"
      | "veterinarian"
      | "nearby") || "post";
  const keyword = params.get("keyword") || "";

  const { results, loading } = useSearch<any>(type, keyword);

  // khi click đổi type thì update URL
  const handleTypeChange = (newType: string) => {
    params.set("type", newType);
    if (keyword) params.set("keyword", keyword); // giữ nguyên keyword
    setParams(params);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <div className="flex px-4 py-8 mx-auto search-container max-w-7xl">
        <CategorySidebar onTypeChange={handleTypeChange} />

        <div className="w-3/5 mt-16">
          <div className="space-y-6" id="searchResults">
            {loading ? (
              <>
                {type === "post" &&
                  [...Array(5)].map((_, i) => <PostSkeleton key={i} />)}

                {type === "user" &&
                  [...Array(5)].map((_, i) => <SkeletonCard key={i} />)}

                {type === "pet" &&
                  [...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
              </>
            ) : (
              <>
                {type === "post" && <ListPost posts={results} />}
                {type === "user" && <UserSearchList users={results} />}
                {type === "pet" && <PetSearchList pets={results} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
