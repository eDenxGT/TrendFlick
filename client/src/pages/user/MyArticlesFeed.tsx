import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleModal from "@/components/modals/ArticleModal";
import UserListModal from "@/components/modals/UserListModal";
import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Article } from "@/types/Article";
import { deleteArticle, getArticlesByUser } from "@/services/userService";
import { getCurrentUser } from "@/utils/helpers/getCurrentUser.helper";
import { useToaster } from "@/hooks/ui/useToaster";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";

const MyArticlesFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userListModal, setUserListModal] = useState<{
    isOpen: boolean;
    title: string;
    type: "upvoters" | "downvoters" | "blockers";
    articleId: string;
  }>({
    isOpen: false,
    title: "",
    type: "upvoters",
    articleId: "",
  });

  const { successToast, errorToast } = useToaster();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticlesByUser();
        setArticles(articles.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    articleId: "",
  });

  const navigate = useNavigate();

  const userData = getCurrentUser();
  const currentUserId = userData ? userData.userId : null;

  const handleEdit = (article: Article) => {
    navigate(`/edit-article/${article.articleId}`);
  };

  const handleDeleteClick = (articleId: string) => {
    setDeleteDialog({
      isOpen: true,
      articleId,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteArticle(deleteDialog.articleId);
      if (response.success) {
        setArticles((prevArticles) =>
          prevArticles.filter(
            (article) => article.articleId !== deleteDialog.articleId
          )
        );
        successToast(response.message || "Article deleted successfully");
      }
      setDeleteDialog({ isOpen: false, articleId: "" });
    } catch (error: any) {
      console.error("Error deleting article:", error);
      errorToast(error?.response?.data?.message || "Error deleting article");
    }
  };

  const handleOpenDetails = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleShowUpvoters = (articleId: string) => {
    setUserListModal({
      isOpen: true,
      title: "Upvoted by",
      type: "upvoters",
      articleId,
    });
  };

  const handleShowDownvoters = (articleId: string) => {
    setUserListModal({
      isOpen: true,
      title: "Downvoted by",
      type: "downvoters",
      articleId,
    });
  };

  const handleShowBlockers = (articleId: string) => {
    setUserListModal({
      isOpen: true,
      title: "Blocked by",
      type: "blockers",
      articleId,
    });
  };

  const handleCreateArticle = () => {
    navigate("/create-article");
  };

  const handleUpvote = () => {};
  const handleDownvote = () => {};
  const handleBlock = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826]">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#ecfeff] mb-1 sm:mb-2">
              My Articles
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Manage your published articles and view their performance
            </p>
          </div>
          <Button
            onClick={handleCreateArticle}
            className="bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            <Plus size={16} className="mr-2" />
            Create Article
          </Button>
        </div>

        {/* Articles list */}
        <div className="space-y-3 sm:space-y-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.articleId}
                article={article}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
                onBlock={handleBlock}
                onOpenDetails={handleOpenDetails}
                currentUserId={currentUserId}
                showOwnerActions={true}
                showDetailedStats={true}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onShowUpvoters={handleShowUpvoters}
                onShowDownvoters={handleShowDownvoters}
                onShowBlockers={handleShowBlockers}
              />
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-[#94a3b8] text-base sm:text-lg">
                You haven't published any articles yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article modal */}
      <ArticleModal
        article={selectedArticle}
        isMyArticle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        currentUserId={currentUserId}
      />

      {/* User list modal */}
      <UserListModal
        isOpen={userListModal.isOpen}
        onClose={() =>
          setUserListModal({
            isOpen: false,
            title: "",
            type: "upvoters",
            articleId: "",
          })
        }
        type={userListModal.type}
        articleId={userListModal.articleId}
        title={userListModal.title}
      />

      {/* Delete confirmation dialog */}
      <ConfirmationModal
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, articleId: "" })}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="destructive"
        onConfirm={() => handleDeleteConfirm()}
      />
    </div>
  );
};

export default MyArticlesFeed;
