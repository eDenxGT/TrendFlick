"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Ban } from "lucide-react"
import type { Article } from "@/types/Article"
import { cn } from "@/lib/utils"
import { getSmartDate } from "@/utils/helpers/timeFormatter.helper"

interface ArticleCardProps {
  article: Article
  onUpvote: (articleId: string) => void
  onDownvote: (articleId: string) => void
  onBlock: (articleId: string) => void
  onOpenDetails: (article: Article) => void
  currentUserId: string
  getCategoryName?: (categoryId: string) => string
}

const ArticleCard = ({
  article,
  onUpvote,
  onDownvote,
  onBlock,
  onOpenDetails,
  currentUserId,
  getCategoryName,
}: ArticleCardProps) => {
  const hasUpvoted = article.upVotes.includes(currentUserId)
  const hasDownvoted = article.downVotes.includes(currentUserId)
  const netVotes = article.upVotes.length - article.downVotes.length

  return (
    <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg hover:shadow-xl transition-all duration-200">
      <CardContent className="p-0">
        <div className="p-4">
          {/* Post metadata */}
          <div className="text-xs text-[#64748b] flex items-center mb-2">
            <span className="font-medium text-[#94a3b8]">
              {getCategoryName ? getCategoryName(article.categoryId) : article.categoryId}
            </span>
            <span className="mx-1">•</span>
            <span>Posted by {article.createdBy}</span>
            <span className="mx-1">•</span>
            <span>{getSmartDate(article.createdAt.toString())}</span>
          </div>

          {/* Post title */}
          <h3
            className="text-lg font-semibold text-[#ecfeff] hover:text-[#06b6d4] cursor-pointer transition-colors mb-3"
            onClick={() => onOpenDetails(article)}
          >
            {article.title}
          </h3>

          {/* Post content */}
          <div className="space-y-3">
            {article.image && (
              <div className="cursor-pointer" onClick={() => onOpenDetails(article)}>
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="max-h-96 w-full object-cover rounded-md border border-[#164e63]/30 hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            {article.description && (
              <p className="text-[#94a3b8] text-sm line-clamp-3 cursor-pointer" onClick={() => onOpenDetails(article)}>
                {article.description}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 pt-3 border-t border-[#164e63]/30 flex items-center gap-2">
            {/* Upvote button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-[#94a3b8] hover:bg-[#155e75]/20 flex items-center gap-1 text-xs h-8 px-3",
                hasUpvoted && "text-[#06b6d4] hover:text-[#38bdf8]",
              )}
              onClick={() => onUpvote(article.articleId)}
            >
              <ArrowUp size={14} />
            </Button>

            {/* Vote count - Reddit style */}
            <span
              className={cn(
                "text-xs font-medium",
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
                "text-[#94a3b8] hover:bg-[#155e75]/20 flex items-center gap-1 text-xs h-8 px-3",
                hasDownvoted && "text-[#f43f5e] hover:text-[#fb7185]",
              )}
              onClick={() => onDownvote(article.articleId)}
            >
              <ArrowDown size={14} />
            </Button>

            {/* Block button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-[#94a3b8] hover:text-[#f43f5e] hover:bg-[#155e75]/20 flex items-center gap-1 text-xs h-8 px-3 ml-auto"
              onClick={() => onBlock(article.articleId)}
            >
              <Ban size={14} />
              <span>Block</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
