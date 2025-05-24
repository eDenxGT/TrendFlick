import { useEffect, useState } from "react";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleModal from "@/components/modals/ArticleModal";
import type { Article } from "@/types/Article";
import Header from "@/components/common/Header";
import { getCurrentUser } from "@/utils/helpers/getCurrentUser.helper";
import {
  blockArticle,
  getArticlesByPreferances,
  voteArticle,
} from "@/services/userService";
import { useToaster } from "@/hooks/ui/useToaster";

const Feed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { errorToast } = useToaster();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticlesByPreferances();
        setArticles(articles.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const userData = getCurrentUser();
  const currentUserId = userData ? userData.userId : null;

  const handleUpvote = async (articleId: string) => {
    try {
      const response = await voteArticle(articleId, "upvote");
      if (response.success) {
        setArticles((prev) =>
          prev.map((article) => {
            if (article.articleId !== articleId) return article;

            const hasUpvoted = article.upVotes.includes(currentUserId);
            const hasDownvoted = article.downVotes.includes(currentUserId);

            let newUpVotes = [...article.upVotes];
            let newDownVotes = [...article.downVotes];

            if (hasUpvoted) {
              newUpVotes = newUpVotes.filter((id) => id !== currentUserId);
            } else {
              newUpVotes.push(currentUserId);
              if (hasDownvoted) {
                newDownVotes = newDownVotes.filter(
                  (id) => id !== currentUserId
                );
              }
            }

            if (selectedArticle?.articleId === articleId) {
              setSelectedArticle({
                ...selectedArticle,
                upVotes: newUpVotes,
                downVotes: newDownVotes,
              });
            }

            return { ...article, upVotes: newUpVotes, downVotes: newDownVotes };
          })
        );
      }
    } catch (err: any) {
      errorToast(err?.response?.data?.message || "Failed to vote");
    }
  };

  const handleDownvote = async (articleId: string) => {
    try {
      const response = await voteArticle(articleId, "downvote");
      if (response.success) {
        setArticles((prev) =>
          prev.map((article) => {
            if (article.articleId !== articleId) return article;

            const hasUpvoted = article.upVotes.includes(currentUserId);
            const hasDownvoted = article.downVotes.includes(currentUserId);

            let newUpVotes = [...article.upVotes];
            let newDownVotes = [...article.downVotes];

            if (hasDownvoted) {
              newDownVotes = newDownVotes.filter((id) => id !== currentUserId);
            } else {
              newDownVotes.push(currentUserId);
              if (hasUpvoted) {
                newUpVotes = newUpVotes.filter((id) => id !== currentUserId);
              }
            }

            if (selectedArticle?.articleId === articleId) {
              setSelectedArticle({
                ...selectedArticle,
                upVotes: newUpVotes,
                downVotes: newDownVotes,
              });
            }

            return {
              ...article,
              upVotes: newUpVotes,
              downVotes: newDownVotes,
            };
          })
        );
      }
    } catch (err: any) {
      errorToast(err?.response?.data?.message || "Failed to vote");
    }
  };

  const handleBlock = async (articleId: string) => {
    try {
      const response = await blockArticle(articleId);
      if (response.success) {
        setArticles((prev) =>
          prev.map((article) => {
            if (article.articleId !== articleId) return article;

            const isBlocked = article.blockedBy.includes(currentUserId);
            if (!isBlocked) {
              return {
                ...article,
                blockedBy: [...article.blockedBy, currentUserId],
              };
            }

            if (selectedArticle?.articleId === articleId) {
              setSelectedArticle({
                ...selectedArticle,
                blockedBy: [...selectedArticle.blockedBy, currentUserId],
              });
            }

            return article;
          })
        );
      }
    } catch (err: any) {
      errorToast(err?.response?.data?.message || "Failed to block article");
    }
  };

  const handleOpenDetails = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826]">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#ecfeff] mb-1 sm:mb-2">
            Your Personalized Feed
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8]">
            Discover articles curated for your interests
          </p>
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
              />
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-[#94a3b8] text-base sm:text-lg">
                No articles found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onBlock={handleBlock}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default Feed;
