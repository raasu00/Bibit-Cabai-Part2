import React, { useState } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ProductCard } from '../components/sections/ProductCard';
import { Layout } from '../components/layout/Layout';
import { varieties } from '../data/varieties';
import { 
  Filter, 
  Search, 
  TrendingUp, 
  Flame,
  Sun,
  Clock
} from 'lucide-react';

export const VarietiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [spicinessRange, setSpicinessRange] = useState<[number, number]>([1, 10]);
  const [selectedHarvestTime, setSelectedHarvestTime] = useState<string>('');

  const difficulties = ['Mudah', 'Sedang', 'Sulit'];
  const harvestTimes = ['60-70 hari', '70-80 hari', '80-90 hari', '90-100 hari'];

  // Filter varieties
  const filteredVarieties = varieties.filter((variety) => {
    const matchesSearch = variety.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variety.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = !selectedDifficulty || variety.difficulty === selectedDifficulty;
    
    const matchesSpiciness = variety.spiciness >= spicinessRange[0] && 
                            variety.spiciness <= spicinessRange[1];
    
    const matchesHarvestTime = !selectedHarvestTime || variety.harvestTime === selectedHarvestTime;
    
    return matchesSearch && matchesDifficulty && matchesSpiciness && matchesHarvestTime;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSpicinessRange([1, 10]);
    setSelectedHarvestTime('');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Varietas Bibit Cabai"
        subtitle="Kami menyediakan berbagai varietas bibit cabai dengan karakteristik unggulan masing-masing untuk kebutuhan budidaya Anda."
        backgroundImage="/cabai-rawit-hijau.jpg"
        showButtons={false}
      />

      {/* Filter Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-agriculture-50 to-orange-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-6 h-6" />
                  Filter Varietas
                </h2>
                <p className="text-gray-600">
                  Temukan varietas yang cocok dengan kebutuhan Anda
                </p>
              </div>
              
              <button
                onClick={resetFilters}
                className="btn btn-outline self-start md:self-center"
              >
                Reset Filter
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari varietas cabai..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agriculture-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tingkat Kesulitan
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(
                        selectedDifficulty === difficulty ? '' : difficulty
                      )}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? difficulty === 'Mudah'
                            ? 'bg-green-100 text-green-800'
                            : difficulty === 'Sedang'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spiciness Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Tingkat Kepedasan: {spicinessRange[0]} - {spicinessRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={spicinessRange[0]}
                    onChange={(e) => setSpicinessRange([parseInt(e.target.value), spicinessRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={spicinessRange[1]}
                    onChange={(e) => setSpicinessRange([spicinessRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Harvest Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Masa Panen
                </label>
                <select
                  value={selectedHarvestTime}
                  onChange={(e) => setSelectedHarvestTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agriculture-500 focus:border-transparent"
                >
                  <option value="">Semua Masa Panen</option>
                  {harvestTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700">
              Menampilkan <span className="font-bold">{filteredVarieties.length}</span> dari{' '}
              <span className="font-bold">{varieties.length}</span> varietas
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Produktivitas Tinggi</span>
