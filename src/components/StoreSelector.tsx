import React, { useState, useRef, useEffect } from 'react';
import { Store as StoreIcon, ChevronDown, Check, Sparkles } from 'lucide-react';
import { Store } from '../types';

interface StoreSelectorProps {
  stores: Store[];
  currentStoreId: string;
  onSelectStore: (storeId: string) => void;
  variant?: 'header' | 'sidebar' | 'compact';
  direction?: 'up' | 'down';
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores,
  currentStoreId,
  onSelectStore,
  variant = 'header',
  direction = variant === 'sidebar' ? 'down' : 'down'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStore = stores.find(s => s.id === currentStoreId) || stores[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (storeId: string) => {
    onSelectStore(storeId);
    setIsOpen(false);
  };

  if (variant === 'sidebar') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          title="Clique para alternar de loja"
          className="w-full p-2.5 rounded-2xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 hover:border-purple-600/60 transition-all flex items-center justify-between text-left group shadow-sm"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            {currentStore?.logoUrl ? (
              <img
                src={currentStore.logoUrl}
                alt={currentStore.name}
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-purple-500/40 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 shrink-0">
                <StoreIcon className="w-4 h-4" />
              </div>
            )}
            <div className="overflow-hidden min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300/80 truncate">
                  {currentStore?.segment || 'Loja'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white truncate leading-tight group-hover:text-purple-200">
                {currentStore?.name || 'Selecionar Loja'}
              </h4>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-purple-400 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-white' : 'group-hover:text-white'
            }`}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className={`absolute left-0 w-full min-w-[240px] bg-[#120e26] border border-purple-700/50 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.6)] p-2 z-50 animate-in fade-in ${
              direction === 'up'
                ? 'bottom-full mb-2 slide-in-from-bottom-2'
                : 'top-full mt-2 slide-in-from-top-2'
            }`}
          >
            <div className="px-2.5 py-1.5 border-b border-purple-900/40 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Alternar Loja</span>
              <span className="text-[10px] text-purple-400/80">{stores.length} lojas</span>
            </div>
            <div className="space-y-1">
              {stores.map((store) => {
                const isSelected = store.id === currentStoreId;
                return (
                  <button
                    key={store.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(store.id)}
                    className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-purple-600/30 border border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'hover:bg-purple-950/60 text-purple-200/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {store.logoUrl ? (
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/30 shrink-0"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-purple-900/40 flex items-center justify-center shrink-0">
                          <StoreIcon className="w-3.5 h-3.5 text-purple-300" />
                        </div>
                      )}
                      <div className="overflow-hidden min-w-0">
                        <p className="text-xs font-semibold truncate leading-tight">{store.name}</p>
                        <p className="text-[10px] text-purple-400 truncate">{store.segment}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header or default variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Alternar entre as lojas cadastradas"
        className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#130f24] hover:bg-purple-950/50 border border-purple-900/50 hover:border-purple-500/60 transition-all text-left shadow-sm group"
      >
        <div className="relative">
          {currentStore?.logoUrl ? (
            <img
              src={currentStore.logoUrl}
              alt={currentStore.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-purple-500/40 group-hover:ring-purple-400"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300">
              <StoreIcon className="w-4 h-4" />
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#130f24]" />
        </div>

        <div className="hidden sm:block text-left max-w-[130px] md:max-w-[160px] lg:max-w-[200px]">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-wider font-bold text-purple-400/90 truncate">
              {currentStore?.segment || 'Loja Ativa'}
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight group-hover:text-purple-200">
            {currentStore?.name || 'Selecione a Loja'}
          </h4>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : 'group-hover:text-white'
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 bg-[#120e26] border border-purple-700/50 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.65)] p-2.5 z-50 animate-in fade-in slide-in-from-top-2"
        >
          <div className="px-3 py-2 border-b border-purple-900/40 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Alternar Loja</span>
            </div>
            <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full font-medium">
              {stores.length} disponíveis
            </span>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {stores.map((store) => {
              const isSelected = store.id === currentStoreId;
              return (
                <button
                  key={store.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(store.id)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-600/30 border border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                      : 'hover:bg-purple-950/60 text-purple-200/80 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {store.logoUrl ? (
                      <img
                        src={store.logoUrl}
                        alt={store.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-purple-500/30 shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-purple-900/40 flex items-center justify-center shrink-0">
                        <StoreIcon className="w-4 h-4 text-purple-300" />
                      </div>
                    )}
                    <div className="overflow-hidden min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold truncate leading-tight text-white">{store.name}</h5>
                        {store.plan && (
                          <span className="text-[9px] bg-purple-900/60 text-purple-300 px-1.5 py-0.2 rounded border border-purple-700/40 font-medium">
                            {store.plan}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-purple-400 truncate mt-0.5">{store.segment}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-purple-200" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
