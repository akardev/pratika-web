export interface TrialInfo {
  startDate: Date;
  endDate: Date;
  daysLeft: number;
  isExpired: boolean;
  startDateFormatted: string;
  endDateFormatted: string;
  planName: string;
  statusText: string;
  isUrgent: boolean;
}

export function calculateTrialInfo(createdAt?: string | Date | null): TrialInfo {
  const startDate = createdAt ? new Date(createdAt) : new Date();
  const trialDurationDays = 15;
  const endDate = new Date(startDate.getTime() + trialDurationDays * 24 * 60 * 60 * 1000);
  const now = new Date();

  const diffMs = endDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const isExpired = diffMs <= 0;
  const isUrgent = daysLeft <= 3 && !isExpired;

  const startDateFormatted = startDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const endDateFormatted = endDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const statusText = isExpired
    ? 'Deneme Süresi Sona Erdi'
    : `${daysLeft} gün kaldı (${endDateFormatted})`;

  return {
    startDate,
    endDate,
    daysLeft,
    isExpired,
    startDateFormatted,
    endDateFormatted,
    planName: '15 Günlük Ücretsiz Deneme (Profesyonel)',
    statusText,
    isUrgent,
  };
}
