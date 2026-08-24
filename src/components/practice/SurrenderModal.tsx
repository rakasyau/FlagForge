import { AlertTriangle, Eye, X, ShieldAlert } from 'lucide-react';

interface SurrenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  challengeTitle: string;
  points: number;
}

export const SurrenderModal: React.FC<SurrenderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  challengeTitle,
  points
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-full max-w-md bg-surface-panel text-txt-on-light rounded-[28px] p-6 shadow-2xl border border-white/40 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-txt-subtle hover:text-txt-on-light transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#FEF3F2] text-state-locked flex items-center justify-center mb-4 border border-state-locked/20 shadow-sm">
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Modal Title & Text */}
        <h3 className="text-xl font-display font-bold text-txt-on-light mb-2">
          Lihat Kunci Jawaban & Write-up?
        </h3>

        <p className="text-sm text-txt-subtle leading-relaxed mb-4">
          Anda akan membuka penjelasan lengkap untuk soal <strong className="text-txt-on-light">"{challengeTitle}"</strong>.
        </p>

        {/* Important Warning Notice Box */}
        <div className="bg-[#FFF4E5] border border-[#FFE2B8] rounded-xl p-3.5 mb-6 text-xs text-[#7A3218] leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0 text-flag mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Konsekuensi Pembelajaran:</span>
            Status soal akan ditandai permanen sebagai <strong className="underline">Dilihat Jawabannya (Revealed)</strong> di profil dan Anda <strong>tidak akan mendapatkan +{points} poin</strong> untuk soal ini.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-xs font-semibold bg-black/5 hover:bg-black/10 text-txt-on-light transition-colors"
          >
            Kembali & Coba Lagi
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-state-locked hover:bg-red-600 text-white shadow-md transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Saya Menyerah, Tampilkan Jawaban</span>
          </button>
        </div>
      </div>
    </div>
  );
};
