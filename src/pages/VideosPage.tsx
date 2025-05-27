import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom'; // Already imported
import { useAuth } from '../contexts/AuthContext'; // Already imported
import { Play, Clock, Eye, ThumbsUp, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  views: string;
  category: string;
}

const VideosPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const videos: Video[] = [
    {
      id: '1',
      title: 'Digital Detox: Reclaiming Your Life from Smartphone Addiction',
      description:
        'Learn practical strategies to reduce smartphone dependency and improve your mental well-being. This comprehensive guide covers digital minimalism principles and actionable steps.',
      youtubeId: 'wf2VxeIm1no',
      duration: '12:45',
      views: '2.3M',
      category: 'Digital Wellness',
    },
    {
      id: '2',
      title: 'Mindful Technology Use: Building Healthy Digital Habits',
      description:
        'Discover how to use technology mindfully and create boundaries that support your goals. Perfect for students and young professionals.',
      youtubeId: 'VpHyLG-sc4g',
      duration: '8:32',
      views: '1.8M',
      category: 'Mindfulness',
    },
    {
      id: '3',
      title: 'What is Digital Detox - By Anupam Sir',
      description: 'Anupam Sir explains the concept of digital detox and its importance in today\'s digital age.',
      youtubeId: '5juBlNIMF-8',
      duration: '11:46',
      views: '329K',
      category: 'Digital Wellness',
    },
    {
      id: '4',
      title: 'Digital Wellbeing Tutorial in Hindi',
      description: 'A comprehensive tutorial on using digital wellbeing tools to maintain a healthy digital lifestyle.',
      youtubeId: 'djv4u1BJix0',
      duration: '7:30',
      views: '1.1M',
      category: 'Mindfulness',
    },
    {
      id: '5',
      title: 'Focus & Productivity: Eliminating Digital Distractions',
      description:
        'Master the art of deep focus in the digital age. Learn techniques used by top performers to maintain concentration and boost productivity.',
      youtubeId: '8jPQjjsBbIc',
      duration: '15:20',
      views: '980K',
      category: 'Productivity',
    },
    {
      id: '6',
      title: 'How To Quickly Improve Focus And Concentration (in Hindi)',
      description: 'Tips and techniques to enhance focus and concentration effectively.',
      youtubeId: 'p86i5Y1H0DI',
      duration: '5:50',
      views: '1.5M',
      category: 'Productivity',
    },
    {
      id: '7',
      title: 'How to Increase FOCUS and Concentration (Hindi)',
      description: 'Strategies to improve focus and avoid distractions during work or study.',
      youtubeId: '0LzCBZTsRW4',
      duration: '6:40',
      views: '980K',
      category: 'Productivity',
    },
    {
      id: '8',
      title: 'Stop Social Media Addiction With This 4 Step Plan',
      description: 'A four-step plan to overcome social media addiction and regain control over your time.',
      youtubeId: 'AT8YmOpYRME',
      duration: '7:20',
      views: '1.3M',
      category: 'Digital Wellness',
    },
    {
      id: '9',
      title: 'How To Break Social Media Addiction (Hindi)',
      description: 'Guidance on breaking free from social media addiction and focusing on personal growth.',
      youtubeId: 'bWesbCOS8Mw',
      duration: '8:00',
      views: '1.1M',
      category: 'Digital Wellness',
    },
  ];


  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
    // Scroll to video
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTrackingClick = () => {
    if (isAuthenticated) {
      navigate('/tracker');
    } else {
      navigate('/register');
    }
  };

  // Add handler for "Explore Tips" button
  const handleExploreTipsClick = () => {
    navigate('/tips'); // Redirect to Tips page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12" data-id="j7uwe1ozs" data-path="src/pages/VideosPage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="w6ljswvtn" data-path="src/pages/VideosPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-id="k0geabwq6"
          data-path="src/pages/VideosPage.tsx"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="36bm7egha" data-path="src/pages/VideosPage.tsx">
            Educational
            <span
              className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              data-id="vy6cqq7tb"
              data-path="src/pages/VideosPage.tsx"
            >
              {' '}
              Videos
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="zkt4eh54c" data-path="src/pages/VideosPage.tsx">
            Watch expert-curated videos on digital wellness, mindful technology use, and strategies for building a healthier relationship with your smartphone.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="space-y-12" data-id="ly6rjjwg9" data-path="src/pages/VideosPage.tsx">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              ref={(el) => (videoRefs.current[video.id] = el)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              data-id="5tyfcu35u"
              data-path="src/pages/VideosPage.tsx"
            >
              {/* Video Player */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`} data-id="6zju7bax9" data-path="src/pages/VideosPage.tsx">
                <motion.div
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  data-id="rfsb8wg8i"
                  data-path="src/pages/VideosPage.tsx"
                >
                  {activeVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      data-id="j8tzmnpp1"
                      data-path="src/pages/VideosPage.tsx"
                    />
                  ) : (
                    <div
                      className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center group cursor-pointer"
                      onClick={() => handleVideoPlay(video.id)}
                      data-id="16auhhnc3"
                      data-path="src/pages/VideosPage.tsx"
                    >
                      {/* Thumbnail */}
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        data-id="cesngosar"
                        data-path="src/pages/VideosPage.tsx"
                      />

                      {/* Play Button Overlay */}
                      <div
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300"
                        data-id="r9019r59y"
                        data-path="src/pages/VideosPage.tsx"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
                          data-id="utww8t007"
                          data-path="src/pages/VideosPage.tsx"
                        >
                          <Play
                            className="h-8 w-8 text-white ml-1"
                            fill="currentColor"
                            data-id="mxythgg29"
                            data-path="src/pages/VideosPage.tsx"
                          />
                        </motion.div>
                      </div>

                      {/* Duration Badge */}
                      <div
                        className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm font-medium"
                        data-id="oiycemt61"
                        data-path="src/pages/VideosPage.tsx"
                      >
                        {video.duration}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Video Info */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`} data-id="p4aez41ih" data-path="src/pages/VideosPage.tsx">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  data-id="opyrfehu4"
                  data-path="src/pages/VideosPage.tsx"
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm" data-id="vby5i9p8l" data-path="src/pages/VideosPage.tsx">
                    <CardHeader data-id="e9iznj8g0" data-path="src/pages/VideosPage.tsx">
                      <div className="flex items-center justify-between mb-2" data-id="35cwmv70j" data-path="src/pages/VideosPage.tsx">
                        <span
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          data-id="vip5xq37q"
                          data-path="src/pages/VideosPage.tsx"
                        >
                          {video.category}
                        </span>
                        <div className="flex items-center space-x-4 text-sm text-gray-500" data-id="fpxzz671s" data-path="src/pages/VideosPage.tsx">
                          <div className="flex items-center" data-id="23o3pj2ta" data-path="src/pages/VideosPage.tsx">
                            <Eye className="h-4 w-4 mr-1" data-id="k52unkmto" data-path="src/pages/VideosPage.tsx" />
                            {video.views}
                          </div>
                          <div className="flex items-center" data-id="y4tr3mjhl" data-path="src/pages/VideosPage.tsx">
                            <Clock className="h-4 w-4 mr-1" data-id="gho6sky48" data-path="src/pages/VideosPage.tsx" />
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle
                        className="text-2xl font-bold text-gray-900 leading-tight"
                        data-id="rdmgrodj1"
                        data-path="src/pages/VideosPage.tsx"
                      >
                        {video.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent data-id="0u77heqd3" data-path="src/pages/VideosPage.tsx">
                      <p className="text-gray-600 mb-6 leading-relaxed" data-id="59sgsru3q" data-path="src/pages/VideosPage.tsx">
                        {video.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3" data-id="39dc7go9a" data-path="src/pages/VideosPage.tsx">
                        {activeVideo !== video.id && (
                          <Button
                            onClick={() => handleVideoPlay(video.id)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white flex-1"
                            data-id="wxl8za2zt"
                            data-path="src/pages/VideosPage.tsx"
                          >
                            <Play className="h-4 w-4 mr-2" data-id="6v8uketea" data-path="src/pages/VideosPage.tsx" />
                            Watch Now
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                          data-id="5hjwrmdrn"
                          data-path="src/pages/VideosPage.tsx"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" data-id="ihb6tilax" data-path="src/pages/VideosPage.tsx" />
                          Open in YouTube
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-id="l8pifpqh6"
          data-path="src/pages/VideosPage.tsx"
        >
          <h2 className="text-3xl font-bold mb-4" data-id="zc7u0ueh8" data-path="src/pages/VideosPage.tsx">
            Want More Personalized Guidance?
          </h2>
          <p className="text-xl mb-6 opacity-90" data-id="l05oai1qs" data-path="src/pages/VideosPage.tsx">
            Track your progress and get personalized recommendations based on your usage patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="hlud4e0zg" data-path="src/pages/VideosPage.tsx">
            <Button
              size="lg"
              onClick={handleTrackingClick}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              data-id="h60vwcjp4"
              data-path="src/pages/VideosPage.tsx"
            >
              Start Tracking
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleExploreTipsClick} // Add onClick handler
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              data-id="f0jj0fonw"
              data-path="src/pages/VideosPage.tsx"
            >
              Explore Tips
            </Button>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-id="k87zl4lpg"
          data-path="src/pages/VideosPage.tsx"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4" data-id="evpl692ol" data-path="src/pages/VideosPage.tsx">
            Looking for More Content?
          </h3>
          <p className="text-gray-600 mb-6" data-id="ggb7421jv" data-path="src/pages/VideosPage.tsx">
            We regularly update our video library with fresh content on digital wellness and productivity.
          </p>
          <div className="flex justify-center space-x-4" data-id="h3f4nm55g" data-path="src/pages/VideosPage.tsx">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
              data-id="3q7psxi0v"
              data-path="src/pages/VideosPage.tsx"
            >
              <ThumbsUp className="h-4 w-4 mr-2" data-id="hc8sp0e0o" data-path="src/pages/VideosPage.tsx" />
              Subscribe for Updates
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideosPage;