import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Ban } from "lucide-react"
import type { Article } from "@/types/Article"
import { cn } from "@/lib/utils"
import { getSmartDate } from "@/utils/helpers/timeFormatter.helper"

interface ArticleModalProps {
  article: Article | null
  isOpen: boolean
  onClose: () => void
  onUpvote: (articleId: string) => void
  onDownvote: (articleId: string) => void
  onBlock?: (articleId: string) => void
  currentUserId: string
  getCategoryName?: (categoryId: string) => string
  isMyArticle?: boolean
}

const ArticleModal = ({
  article,
  isOpen,
  onClose,
  onUpvote,
  onDownvote,
  onBlock,
  currentUserId,
  isMyArticle,
}: ArticleModalProps) => {
  if (!article) return null

  const hasUpvoted = article.upVotes.includes(currentUserId)
  const hasDownvoted = article.downVotes.includes(currentUserId)
  const netVotes = article.upVotes.length - article.downVotes.length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="custom-scrollbar max-w-4xl max-h-[80vh] overflow-y-auto bg-[#0f1729] border-[#164e63]/30">
        <DialogHeader>
          <div className="flex items-center text-xs text-[#64748b] mb-2">
            <span className="font-medium text-[#94a3b8]">
              {article.category}
            </span>
            <span className="mx-1">•</span>
            <span>Posted by {article.creatorName}</span>
            <span className="mx-1">•</span>
            <span>{getSmartDate(article.createdAt.toString())}</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-[#ecfeff] pr-8">{article.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article image */}
          {article.image && (
            <div className="w-full">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full max-h-96 object-cover rounded-lg border border-[#164e63]/30"
              />
            </div>
          )}

          {/* Article description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">{article.description}</p>
          </div>

          {/* Action buttons */}
          <div className="py-3 border-t border-[#164e63]/30 flex items-center gap-2">
            {/* Upvote button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-[#94a3b8] hover:bg-[#155e75]/20 flex items-center gap-1 text-sm h-9 px-4",
                hasUpvoted && "text-[#06b6d4] hover:text-[#38bdf8]",
              )}
              onClick={() => onUpvote(article.articleId)}
            >
              <ArrowUp size={16} />
            </Button>

            {/* Vote count - Reddit style */}
            <span
              className={cn(
                "text-sm font-medium",
                netVotes > 0 && "text-[#06b6d4]",
                netVotes < 0 && "text-[#f43f5e]",
                netVotes === 0 && "text-[#94a3b8]",
              )}
            >
              {netVotes}
            </span>

            {/* Downvote button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-[#94a3b8] hover:bg-[#155e75]/20 flex items-center gap-1 text-sm h-9 px-4",
                hasDownvoted && "text-[#f43f5e] hover:text-[#fb7185]",
              )}
              onClick={() => onDownvote(article.articleId)}
            >
              <ArrowDown size={16} />
            </Button>

            {!isMyArticle && (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#94a3b8] hover:text-[#f43f5e] hover:bg-[#155e75]/20 flex items-center gap-1 text-sm h-9 px-4 ml-auto"
                onClick={() => {
                  onBlock?.(article.articleId)
                  onClose()
                }}
              >
                <Ban size={16} />
                <span>Block</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArticleModal