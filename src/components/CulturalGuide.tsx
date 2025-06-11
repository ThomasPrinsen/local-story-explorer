
import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, BookOpen, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CulturalGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const culturalGuides = [
    {
      id: 1,
      title: 'Begroetingen Wereldwijd',
      region: 'Internationaal',
      icon: '👋',
      importance: 'Hoog',
      dos: [
        'Nederland: Stevige handdruk met oogcontact',
        'Japan: Buig licht (15°) bij eerste ontmoeting',
        'Spanje: Twee kusjes op de wang bij vrienden',
        'Marokko: "As-salāmu ʿalaykum" en handdruk'
      ],
      donts: [
        'Nederland: Niet te enthousiast omhelzen',
        'Japan: Geen handdruk forceren als ze buigen',
        'Spanje: Geen kusjes bij zakelijke meetings',
        'Marokko: Geen fysiek contact tussen mannen/vrouwen'
      ],
      context: 'Begroetingen zijn de eerste indruk en tonen respect voor lokale gewoontes.'
    },
    {
      id: 2,
      title: 'Eetcultuur & Tafelmanieren',
      region: 'Wereldwijd',
      icon: '🍽️',
      importance: 'Hoog',
      dos: [
        'Japan: Zeg "Itadakimasu" voor het eten',
        'Nederland: Wacht tot iedereen heeft voor je begint',
        'Spanje: Eet tapas met je handen, dat is normaal',
        'Marokko: Eet met je rechterhand, linker is onrein'
      ],
      donts: [
        'Japan: Steek je stokjes niet rechtop in rijst',
        'Nederland: Geen ellebogen op tafel tijdens eten',
        'Spanje: Geen fooi laten als service slecht was',
        'Marokko: Geen alcohol bestellen in traditionele plekken'
      ],
      context: 'Eetgewoontes zijn diep geworteld in cultuur en religie.'
    },
    {
      id: 3,
      title: 'Kledingvoorschriften',
      region: 'Religeuze Plaatsen',
      icon: '👔',
      importance: 'Zeer Hoog',
      dos: [
        'Moskeeën: Bedek armen, benen, hoofd (vrouwen)',
        'Tempels Japan: Nette kleding, geen korte broek',
        'Kerken Europa: Respectvolle, bedekte kleding',
        'Synagoges: Keppeltje voor mannen beschikbaar'
      ],
      donts: [
        'Geen strakke of transparante kleding',
        'Geen shorts/flipflops in heilige plaatsen',
        'Geen religieuze symbolen van andere geloven',
        'Geen fotograferen zonder toestemming'
      ],
      context: 'Kledingregels tonen respect voor geloof en traditie.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Hoe begroet je iemand in Japan bij een eerste zakelijke ontmoeting?',
      options: [
        'Stevige handdruk met oogcontact',
        'Lichte buiging van 15 graden',
        'Vriendelijke omhelzing',
        'High five'
      ],
      correct: 1,
      explanation: 'In Japan is een lichte buiging de traditionele en meest respectvolle begroeting bij formele ontmoetingen.'
    },
    {
      question: 'Wat doe je NIET in een moskee?',
      options: [
        'Je schoenen uittrekken',
        'Je hoofd bedekken',
        'Foto\'s maken zonder toestemming',
        'Stil zijn tijdens gebed'
      ],
      correct: 2,
      explanation: 'Fotograferen zonder toestemming is onrespectvol en vaak verboden in religieuze ruimtes.'
    },
    {
      question: 'Hoe eet je traditioneel tapas in Spanje?',
      options: [
        'Met mes en vork',
        'Met je handen',
        'Staand aan de bar',
        'Alleen optie B en C'
      ],
      correct: 3,
      explanation: 'Tapas eet je traditioneel met je handen terwijl je staat aan de bar - dit is de authentieke Spaanse manier.'
    }
  ];

  const handleQuizAnswer = (selectedAnswer) => {
    if (selectedAnswer === quizQuestions[currentQuiz].correct) {
      setQuizScore(quizScore + 1);
    }
    
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setQuizScore(0);
    setShowQuizResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Do's & Don'ts</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Leer de belangrijkste culturele gewoontes om respectvol te reizen.
        </p>
      </div>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">Culturele Gidsen</TabsTrigger>
          <TabsTrigger value="quiz">Interactieve Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalGuides.map((guide) => (
              <Card 
                key={guide.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-orange-100 hover:border-orange-200"
                onClick={() => setSelectedGuide(guide)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={guide.importance === 'Zeer Hoog' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {guide.importance}
                    </Badge>
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                  
                  <div className="text-center py-4">
                    <span className="text-4xl mb-2 block">{guide.icon}</span>
                  </div>

                  <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{guide.region}</p>
                    <p className="text-sm text-gray-700">{guide.context}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{guide.dos.length} Do's</span>
                      <XCircle className="w-4 h-4 text-red-500 ml-2" />
                      <span className="text-gray-600">{guide.donts.length} Don'ts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card className="max-w-2xl mx-auto border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Culturele Etiquette Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showQuizResult ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Vraag {currentQuiz + 1} van {quizQuestions.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      Score: {quizScore}/{currentQuiz}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quizQuestions[currentQuiz].question}
                    </h3>
                    
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start h-auto p-4 border-gray-200 hover:border-orange-300"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">
                    {quizScore === quizQuestions.length ? '🎉' : quizScore >= quizQuestions.length / 2 ? '👍' : '📚'}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Voltooid!</h3>
                    <p className="text-lg text-gray-600">
                      Je hebt {quizScore} van de {quizQuestions.length} vragen goed!
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    quizScore === quizQuestions.length 
                      ? 'bg-green-50 text-green-800' 
                      : quizScore >= quizQuestions.length / 2 
                        ? 'bg-yellow-50 text-yellow-800'
                        : 'bg-red-50 text-red-800'
                  }`}>
                    {quizScore === quizQuestions.length && "Perfect! Je bent klaar om respectvol te reizen! 🌟"}
                    {quizScore >= quizQuestions.length / 2 && quizScore < quizQuestions.length && "Goed bezig! Nog een paar tips om te onthouden. 💪"}
                    {quizScore < quizQuestions.length / 2 && "Bekijk de culturele gidsen nog eens voor meer tips! 📖"}
                  </div>

                  <Button 
                    onClick={resetQuiz}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Opnieuw Proberen
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Guide Detail Modal */}
      {selectedGuide && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto animate-scale-in">
          <CardHeader className="border-b border-orange-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{selectedGuide.icon}</span>
                  <div>
                    <CardTitle className="text-2xl">{selectedGuide.title}</CardTitle>
                    <p className="text-gray-600">{selectedGuide.region}</p>
                  </div>
                </div>
                <Badge 
                  variant={selectedGuide.importance === 'Zeer Hoog' ? 'destructive' : 'secondary'}
                  className="text-sm"
                >
                  Belang: {selectedGuide.importance}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedGuide(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Waarom dit belangrijk is
                </h4>
                <p className="text-blue-700">{selectedGuide.context}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Do's */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Dit WEL doen:
                  </h4>
                  <div className="space-y-2">
                    {selectedGuide.dos.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-green-800 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Don'ts */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Dit NIET doen:
                  </h4>
                  <div className="space-y-2">
                    {selectedGuide.donts.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-red-800 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background Overlay for Modal */}
      {selectedGuide && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedGuide(null)}
        />
      )}
    </div>
  );
};

export default CulturalGuide;
