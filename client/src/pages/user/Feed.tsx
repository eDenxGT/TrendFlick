import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleModal from "@/components/modals/ArticleModal";
import type { Article } from "@/types/Article";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockArticles: Article[] = [
  {
    articleId: "1",
    title: "The Future of Artificial Intelligence in Healthcare",
    description:
      "Exploring how AI is revolutionizing medical diagnosis, treatment planning, and patient care. From machine learning algorithms that can detect cancer earlier than human doctors to AI-powered surgical robots that perform with unprecedented precision, the healthcare industry is experiencing a technological transformation.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    categoryId: "technology",
    createdBy: "Dr. Sarah Johnson",
    upVotes: ["user1", "user2", "user3"],
    downVotes: ["user4"],
    blockedBy: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    articleId: "2",
    title: "Sustainable Energy Solutions for Urban Development",
    description:
      "A comprehensive look at renewable energy integration in modern cities. This article examines solar panel installations, wind energy systems, and innovative battery storage solutions that are making urban areas more environmentally friendly and energy-efficient.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
    categoryId: "science",
    createdBy: "Michael Chen",
    upVotes: [],
    downVotes: [],
    blockedBy: [],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    articleId: "3",
    title: "The Psychology of Remote Work: Adapting to Digital Collaboration",
    description:
      "Understanding the mental health impacts and productivity benefits of remote work environments. This study explores how teams can maintain connection and creativity while working from distributed locations.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    categoryId: "business",
    createdBy: "Lisa Rodriguez",
    upVotes: ["user2", "user3", "user4", "user5"],
    downVotes: ["user1"],
    blockedBy: [],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
];

const Feed = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const currentUserId = "user1";

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
      <div className="border-b border-[#164e63]/30 bg-[#0f1729]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className=" mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent flex-shrink-0">
              CyberArticles
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 lg:w-64 bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] text-sm"
                />
              <Button
                variant="outline"
                className="border-[#155e75] bg-[#155e75]/50 hover:bg-[#155e75]/20 text-sm px-4 py-2"
                onClick={() => navigate("/settings")}
              >
                Settings
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-[#1e293b]/10"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? (
                  <X className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <Search className="h-4 w-4 text-[#94a3b8]" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#155e75] bg-[#155e75]/50 hover:bg-[#155e75]/20 text-xs px-3 py-1.5"
                onClick={() => navigate("/settings")}
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-3 border-t border-[#164e63]/20 pt-3 mt-3">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] text-sm"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

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
