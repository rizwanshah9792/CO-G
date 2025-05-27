import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Clock, Calendar, BookmarkPlus, ArrowRight, RefreshCw, X } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  publishDate: string;
  category: string;
  thumbnail: string;
  tags: string[];
}

const ArticlesPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define static articles as a fallback
  const tipsArticles: Article[] = [
    {
      id: 999,
      title: '5 Study Tips for Better Focus',
      excerpt: 'Learn how to improve your concentration with these simple study tips...',
      content: '<h3>5 Study Tips for Better Focus</h3><p>1. Find a quiet space. 2. Eliminate distractions. 3. Take breaks. 4. Use active recall. 5. Stay organized.</p>',
      author: 'EduTips',
      readTime: '3 min read',
      publishDate: new Date().toLocaleDateString(),
      category: 'Education',
      thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&h=600&fit=crop',
      tags: ['Education', 'Focus'],
    },
  ];

  const fetchArticles = async () => {
    setLoading(true);
    setArticles([]);

    try {
      const [sportsRes, fitnessRes] = await Promise.all([
        fetch('https://www.thesportsdb.com/api/v1/json/3/all_sports.php'),
        fetch('https://wger.de/api/v2/exercise/?language=2&limit=10'),
      ]);

      const sportsData = await sportsRes.json();
      const fitnessData = await fitnessRes.json();

      // Log API responses for debugging
      console.log('Sports Data:', sportsData);
      console.log('Fitness Data:', fitnessData);

      // Map sports articles with fallbacks for missing fields
      const sportsArticles = sportsData.sports.map((item: any, index: number) => ({
        id: index + 1,
        title: item.strSport || 'Untitled Sport',
        excerpt: item.strSportDescription ? item.strSportDescription.slice(0, 100) + '...' : 'No description available.',
        content: item.strSportDescription
          ? `<h3>${item.strSport}</h3><p>${item.strSportDescription}</p>`
          : `<h3>${item.strSport || 'Untitled Sport'}</h3><p>No detailed description available.</p>`,
        author: 'TheSportsDB',
        readTime: '5 min read',
        publishDate: new Date().toLocaleDateString(),
        category: 'Sports',
        thumbnail: item.strSportThumb || 'https://via.placeholder.com/800x600',
        tags: ['Sports'],
      }));

      // Map fitness articles with fallbacks for missing fields
      const fitnessArticles = fitnessData.results.map((item: any, index: number) => ({
        id: index + 100,
        title: item.name || 'Untitled Exercise',
        excerpt: item.description ? item.description.slice(0, 100) + '...' : 'No description available.',
        content: item.description
          ? `<h3>${item.name}</h3><p>${item.description}</p>`
          : `<h3>${item.name || 'Untitled Exercise'}</h3><p>No detailed description available.</p>`,
        author: 'Wger API',
        readTime: '4 min read',
        publishDate: new Date().toLocaleDateString(),
        category: 'Fitness',
        thumbnail:
          item.images && item.images.length > 0 && item.images[0].image
            ? item.images[0].image
            : 'https://images.unsplash.com/photo-1588776814546-0d3f282cf9e1?w=800&h=600&fit=crop',
        tags: ['Fitness'],
      }));

      // Combine all articles, including static ones
      const combinedArticles = [...sportsArticles, ...fitnessArticles, ...tipsArticles];
      setArticles(combinedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to static articles if API calls fail
      setArticles(tipsArticles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Insightful{' '}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Articles
              </span>
            </h1>
            <Button
              onClick={fetchArticles}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh Insights'}
            </Button>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep dive into expert insights, research findings, and real-world stories about sports,
            fitness, outdoor games, and personal growth.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-600">Loading new insights...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-600">No articles available. Try refreshing again.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-90 text-gray-800">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.publishDate}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: article.excerpt }}
                    />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={() => setSelectedArticle(article)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white group-hover:scale-105 transition-transform duration-300"
                    >
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Insights</h2>
          <p className="text-xl mb-6 opacity-90">
            Get weekly articles and tips delivered to your inbox to support your personal growth
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsFormOpen(true)}
            >
              <BookmarkPlus className="mr-2 h-5 w-5" /> Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Subscribe to Our Newsletter
            </DialogTitle>
          </DialogHeader>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="text-center p-6"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                You’re now subscribed to our newsletter. Check your inbox for the latest updates!
              </p>
            </motion.div>
          ) : (
            <form
              action="https://formspree.io/f/mnndkokr"
              method="POST"
              onSubmit={(e) => {
                setIsSubmitted(true);
                setTimeout(() => {
                  setIsSubmitted(false);
                  setIsFormOpen(false);
                }, 4000);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Subscribe
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl p-8">
          {selectedArticle && (
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h2 className="text-4xl font-bold mb-4">{selectedArticle.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedArticle.author} • {selectedArticle.readTime} • {selectedArticle.publishDate}
                  </p>
                  <img
                    src={selectedArticle.thumbnail}
                    alt={selectedArticle.title}
                    className="w-full h-80 object-cover rounded-lg mb-6 hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />
                </div>
                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedArticle.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full mb-4 bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Back to Articles
                  </Button>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-500 text-white">
                      Share on Twitter
                    </Button>
                    <Button size="sm" className="bg-blue-600 text-white">
                      Share on Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticlesPage;