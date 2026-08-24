'use client';

import { useState } from 'react';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface Course {
  id: string;
  name: string;
  credit: string;
  gradeLetter: string;
}

const GRADE_POINTS: Record<string, number> = {
  AA: 4.0,
  BA: 3.5,
  BB: 3.0,
  CB: 2.5,
  CC: 2.0,
  DC: 1.5,
  DD: 1.0,
  FD: 0.5,
  FF: 0.0,
};

export default function GpaGanoHesaplama() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Ders 1', credit: '4', gradeLetter: 'AA' },
    { id: '2', name: 'Ders 2', credit: '3', gradeLetter: 'BA' },
    { id: '3', name: 'Ders 3', credit: '3', gradeLetter: 'BB' },
    { id: '4', name: 'Ders 4', credit: '2', gradeLetter: 'CB' },
  ]);

  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    equivalent100: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addCourse = () => {
    const newId = Date.now().toString();
    setCourses([...courses, { id: newId, name: `Ders ${courses.length + 1}`, credit: '3', gradeLetter: 'AA' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, val: string) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((c) => {
      const cr = parseFloat(c.credit) || 0;
      const pts = GRADE_POINTS[c.gradeLetter] ?? 0;
      totalCredits += cr;
      totalPoints += cr * pts;
    });

    if (totalCredits === 0) {
      setError('Lütfen en az bir dersin kredisini giriniz.');
      return;
    }

    const gpa = totalPoints / totalCredits;
    const equivalent100 = Math.min(100, Math.max(0, (gpa * 20) + 20));

    setResult({
      gpa,
      totalCredits,
      totalPoints,
      equivalent100,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-2 items-center p-3 rounded-lg border border-border/60 bg-background"
              >
                <div className="col-span-6 sm:col-span-5">
                  <input
                    type="text"
                    placeholder="Ders Adı (Örn: Matematik)"
                    className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  />
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Kredi / AKTS"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                    value={course.credit}
                    onChange={(e) => updateCourse(course.id, 'credit', sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <select
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={course.gradeLetter}
                    onChange={(e) => updateCourse(course.id, 'gradeLetter', e.target.value)}
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="text-muted-foreground hover:text-destructive text-sm disabled:opacity-30 disabled:hover:text-muted-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={addCourse}
              className="py-2.5 px-4 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold rounded-lg border border-border transition-colors"
            >
              + Yeni Ders Ekle
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
            >
              GPA / GANO Not Ortalamasını Hesapla
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
              Hesaplanan Not Ortalaması
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">4.00 Üzerinden GPA / GANO</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.gpa, 2)} / 4.00
              </span>
              <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                100&apos;lük Sistem Karşılığı: ~{formatNumber(result.equivalent100, 2)}
              </span>
            </div>

            <div className="border-t border-border/60 pt-3 flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Toplam Alınan Kredi:</span>
              <span className="font-semibold text-foreground">{result.totalCredits} Kredi/AKTS</span>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">GPA ve GANO Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Genel Ağırlıklı Not Ortalaması (GANO), her dersin kredi veya AKTS değeri ile o dersten alınan harf notu katsayısının çarpılıp toplam krediye bölünmesiyle elde edilir.
        </p>
      </div>
    </div>
  );
}
