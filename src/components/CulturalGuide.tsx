
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FilterMenu from './FilterMenu';

const CulturalGuide = () => {
  const [filters, setFilters] = useState({ continent: '', country: '', city: '' });
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const culturalGuides = [
    // Europa
    {
      id: 1,
      location: 'Amsterdam, Nederland',
      continent: 'Europa',
      country: 'Nederland',
      city: 'Amsterdam',
      dos: [
        'Fiets respectvol - geef voetgangers voorrang',
        'Wacht tot iedereen is ingestapt voordat je uitstapt (tram/metro)',
        'Leer een paar woorden Nederlands - wordt gewaardeerd',
        'Respecteer de coffeeshop cultuur - niet roken op straat'
      ],
      donts: [
        'Niet midden op het fietspad lopen',
        'Geen foto\'s maken van mensen in de Red Light District',
        'Niet schreeuwen of luidruchtig zijn in woonwijken',
        'Geen drugs gebruiken buiten aangewezen plekken'
      ],
      greetings: 'Handen schudden en "Hallo" of "Goedemorgen"',
      tipping: '10% in restaurants als je tevreden bent. Afronden in cafés.',
      clothing: 'Casual kleding prima. Geen speciale kledingregels.',
      taboos: 'Vergelijken met Duitsland. Praten over WO2 zonder context.'
    },
    {
      id: 2,
      location: 'Barcelona, Spanje',
      continent: 'Europa',
      country: 'Spanje',
      city: 'Barcelona',
      dos: [
        'Leer "Bon dia" (Catalaans) - lokale taal',
        'Eet laat - lunch 14:00, diner na 21:00',
        'Respecteer siësta tijd (14:00-17:00)',
        'Wandel langzaam - haast wordt niet gewaardeerd'
      ],
      donts: [
        'Geen Spaans verwachten - veel mensen spreken Catalaans',
        'Niet te vroeg dineren (voor 20:00)',
        'Geen shorts in kerken of formele plekken',
        'Niet vergelijken met rest van Spanje'
      ],
      greetings: 'Twee zoenen (wang aan wang) bij introductie',
      tipping: '5-10% in restaurants. Kleingeld voor tapas.',
      clothing: 'Smart casual. Bedekkende kleding in religieuze gebouwen.',
      taboos: 'Politiek over onafhankelijkheid Catalonië vermijden.'
    },
    // Azië
    {
      id: 3,
      location: 'Kyoto, Japan',
      continent: 'Azië',
      country: 'Japan',
      city: 'Kyoto',
      dos: [
        'Buig licht bij begroeting en bedanken',
        'Trek schoenen uit bij tempels en huizen',
        'Stil zijn in tempels en openbaar vervoer',
        'Ga uit de weg van geisha\'s - zij werken'
      ],
      donts: [
        'Geen foto\'s van geisha\'s zonder toestemming',
        'Niet eten tijdens het lopen',
        'Geen luide gesprekken in treinen',
        'Niet aanraken van heilige objecten'
      ],
      greetings: 'Lichte buiging, geen handdruk tenzij aangeboden',
      tipping: 'Niet fooien - wordt als beledigend gezien',
      clothing: 'Bescheiden kleding. Schoenen makkelijk uit te trekken.',
      taboos: 'WO2 onderwerpen. Neus snuiten in het openbaar.'
    },
    {
      id: 4,
      location: 'Bangkok, Thailand',
      continent: 'Azië',
      country: 'Thailand',
      city: 'Bangkok',
      dos: [
        'Wai begroeting (handpalmen tegen elkaar)',
        'Respecteer koning en koninklijke familie',
        'Bedek schouders en knieën in tempels',
        'Leer "Sawasdee" (hallo) te zeggen'
      ],
      donts: [
        'Nooit hoofd aanraken - heiligste lichaamsdeel',
        'Niet wijzen met voeten naar mensen/Buddha',
        'Geen kritiek op koninklijke familie',
        'Niet boos worden in het openbaar'
      ],
      greetings: 'Wai met lichte buiging. Hoe hoger de handen, hoe respectvoller.',
      tipping: '10% in restaurants. Afronden voor diensten.',
      clothing: 'Bedekte schouders/knieën voor tempels. Lichte, ademende stoffen.',
      taboos: 'Koninklijke familie kritiseren. Boedhabeelden aanraken.'
    },
    // Afrika
    {
      id: 5,
      location: 'Marrakech, Marokko',
      continent: 'Afrika',
      country: 'Marokko',
      city: 'Marrakech',
      dos: [
        'Gebruik rechterhand voor eten en begroetingen',
        'Accepteer uitnodigingen voor thee',
        'Onderhandel respectvol op markten',
        'Leer "As-salamu alaykum" (vrede zij met u)'
      ],
      donts: [
        'Niet eten met linkerhand',
        'Geen alcohol drinken in het openbaar',
        'Niet weigeren aangeboden gastvrijheid',
        'Geen korte kleding in oude stad'
      ],
      greetings: 'Handdruk met rechterhand. Drie zoenen voor goede vrienden.',
      tipping: '10-15% in restaurants. Kleine bedragen voor services.',
      clothing: 'Bedekte armen/benen vooral voor vrouwen. Respectvolle kleding.',
      taboos: 'Politiek vermijden. Niet fotograferen zonder toestemming.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Hoe begroet je iemand in Japan?',
      options: ['Stevige handdruk', 'Lichte buiging', 'Twee zoenen', 'High five'],
      correct: 1,
      explanation: 'In Japan is een lichte buiging de traditionele en respectvolle begroeting.'
    },
    {
      question: 'Wat doe je NIET in een Thaise tempel?',
      options: ['Schoenen uittrekken', 'Wijzen met je voeten', 'Stil zijn', 'Respectvol gedragen'],
      correct: 1,
      explanation: 'In Thailand wordt wijzen met voeten als zeer onrespectvol beschouwd.'
    },
    {
      question: 'Hoeveel fooi geef je in Nederland?',
      options: ['20%', 'Helemaal geen', '10% als je tevreden bent', '5% altijd'],
      correct: 2,
      explanation: 'In Nederland is 10% fooi gebruikelijk als je tevreden bent met de service.'
    }
  ];

  const filteredGuides = culturalGuides.filter(guide => {
    if (filters.city && guide.city !== filters.city) return false;
    if (filters.country && guide.country !== filters.country) return false;
    if (filters.continent && guide.continent !== filters.continent) return false;
    return true;
  });

  const handleFilterChange = (newFilters: { continent: string; country: string; city: string }) => {
    setFilters(newFilters);
  };

  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Do's & Don'ts</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Culturele richtlijnen en etiquette tips van locals om respectvol te reizen.
        </p>
      </div>

      {/* Filter Menu */}
      <FilterMenu onFilterChange={handleFilterChange} />

      {/* Quiz Section */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-orange-600" />
            Culturele Etiquette Quiz
          </CardTitle>
          <CardDescription>
            Test je kennis over verschillende culturele gebruiken wereldwijd.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!quizActive && !quizComplete && (
            <Button onClick={startQuiz} className="bg-orange-500 hover:bg-orange-600">
              Start Quiz
            </Button>
          )}

          {quizActive && !quizComplete && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Vraag {currentQuestion + 1} van {quizQuestions.length}
                </span>
                <span className="text-sm text-gray-600">Score: {score}</span>
              </div>
              
              <h3 className="text-lg font-semibold">{quizQuestions[currentQuestion].question}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(index)}
                    className="p-4 text-left justify-start border-orange-200 hover:bg-orange-50"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {quizComplete && (
            <div className="text-center space-y-4">
              <Trophy className="w-16 h-16 text-orange-500 mx-auto" />
              <h3 className="text-xl font-bold">Quiz Voltooid!</h3>
              <p className="text-lg">
                Je score: {score} van {quizQuestions.length} 
                ({Math.round((score / quizQuestions.length) * 100)}%)
              </p>
              <Button onClick={resetQuiz} variant="outline" className="border-orange-200">
                Opnieuw Proberen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cultural Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-orange-100">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">{guide.location}</CardTitle>
                <Badge variant="secondary" className="bg-white/80">
                  {guide.continent}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Do's */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  Do's
                </h4>
                <ul className="space-y-2">
                  {guide.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-red-700 mb-3">
                  <XCircle className="w-5 h-5" />
                  Don'ts
                </h4>
                <ul className="space-y-2">
                  {guide.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Begroeting</h5>
                  <p className="text-sm text-gray-600">{guide.greetings}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Fooien</h5>
                  <p className="text-sm text-gray-600">{guide.tipping}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Kleding</h5>
                  <p className="text-sm text-gray-600">{guide.clothing}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Taboes</h5>
                  <p className="text-sm text-gray-600">{guide.taboos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Geen culturele gidsen gevonden
          </h3>
          <p className="text-gray-600">
            Er zijn nog geen culturele richtlijnen voor deze locatie. Pas je filters aan of kom later terug.
          </p>
        </div>
      )}
    </div>
  );
};

export default CulturalGuide;
