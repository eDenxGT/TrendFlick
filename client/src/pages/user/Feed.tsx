import { useEffect, useState } from "react";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleModal from "@/components/modals/ArticleModal";
import type { Article } from "@/types/Article";
import Header from "@/components/common/Header";
import { getCurrentUser } from "@/utils/helpers/getCurrentUser.helper";
import { getArticlesByPreferances } from "@/services/userService";

const Feed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
  
  const handleUpvote = (articleId: string) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.articleId === articleId) {
          const hasUpvoted = article.upVotes.includes(currentUserId);
          const hasDownvoted = article.downVotes.includes(currentUserId);

          let newUpVotes = [...article.upVotes];
          let newDownVotes = [...article.downVotes];

          if (hasUpvoted) {
            // Remove upvote
            newUpVotes = newUpVotes.filter((id) => id !== currentUserId);
          } else {
            // Add upvote and remove downvote if exists
            newUpVotes.push(currentUserId);
            if (hasDownvoted) {
              newDownVotes = newDownVotes.filter((id) => id !== currentUserId);
            }
          }

          return {
            ...article,
            upVotes: newUpVotes,
            downVotes: newDownVotes,
          };
        }
        return article;
      })
    );
  };

  const handleDownvote = (articleId: string) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.articleId === articleId) {
          const hasUpvoted = article.upVotes.includes(currentUserId);
          const hasDownvoted = article.downVotes.includes(currentUserId);

          let newUpVotes = [...article.upVotes];
          let newDownVotes = [...article.downVotes];

          if (hasDownvoted) {
            // Remove downvote
            newDownVotes = newDownVotes.filter((id) => id !== currentUserId);
          } else {
            // Add downvote and remove upvote if exists
            newDownVotes.push(currentUserId);
            if (hasUpvoted) {
              newUpVotes = newUpVotes.filter((id) => id !== currentUserId);
            }
          }

          return {
            ...article,
            upVotes: newUpVotes,
            downVotes: newDownVotes,
          };
        }
        return article;
      })
    );
  };

  const handleBlock = (articleId: string) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.articleId === articleId) {
          const isBlocked = article.blockedBy.includes(currentUserId);
          if (!isBlocked) {
            // toast({
            //   title: "Article blocked",
            //   description: "This article has been hidden from your feed.",
            // });
            return {
              ...article,
              blockedBy: [...article.blockedBy, currentUserId],
            };
          }
        }
        return article;
      })
    );
  };

  const handleOpenDetails = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const filteredArticles = articles.filter(
    (article) =>
      !article.blockedBy.includes(currentUserId) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826]">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

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
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
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
              <p className="text-[#64748b] text-xs sm:text-sm mt-2">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Check back later for new content"}
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
