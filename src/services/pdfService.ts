import jsPDF from 'jspdf';
import type { GeneratedQuote } from '../types/portfolio';

export const generateQuotePDF = (quote: GeneratedQuote): void => {
  const doc = new jsPDF();

  // Couleurs
  const primaryColor: [number, number, number] = [59, 130, 246]; // Bleu primaire
  const secondaryColor: [number, number, number] = [107, 114, 128]; // Gris
  const accentColor: [number, number, number] = [34, 197, 94]; // Vert

  // Configuration de la page
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  let currentY = margin;

  // Fonction helper pour centrer le texte
  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Fonction helper pour ajouter du texte avec retour à la ligne
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    for (let i = 0; i < lines.length; i++) {
      if (y + (i * lineHeight) > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines[i], x, y + (i * lineHeight));
    }
    return y + (lines.length * lineHeight);
  };

  // En-tête avec logo/branding
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  centerText('DEVIS AUTOMATIQUE', 25, 16);
  centerText('Portfolio Abdoulaye Diallo', 35, 12);

  currentY = 60;

  // Informations du devis
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('DEVIS DE PRESTATION', margin, currentY);
  currentY += 15;

  // Numéro et date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Numéro: ${quote.id}`, margin, currentY);
  doc.text(`Date: ${quote.createdAt.toLocaleDateString('fr-FR')}`, pageWidth - margin - 60, currentY);
  currentY += 20;

  // Section Client
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 25, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Nom: ${quote.clientName}`, margin + 2, currentY);
  doc.text(`Email: ${quote.clientEmail}`, pageWidth / 2, currentY);
  currentY += 10;

  // Section Projet
  currentY += 10;
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 35, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROJET', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Type: ${quote.projectType}`, margin + 2, currentY);
  doc.text(`Délai: ${quote.timeline}`, pageWidth / 2, currentY);
  currentY += 10;
  currentY = addWrappedText(`Description: ${quote.description}`, margin + 2, currentY, pageWidth - 2 * margin - 4, 5);
  currentY += 10;

  // Fonctionnalités incluses
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 40, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FONCTIONNALITÉS INCLUSES', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  quote.features.forEach((feature, index) => {
    doc.text(`• ${feature}`, margin + 5, currentY + (index * 5));
  });
  currentY += quote.features.length * 5 + 15;

  // Estimation financière
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ESTIMATION FINANCIÈRE', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFontSize(11);
  doc.text(`Heures estimées: ${quote.estimatedHours}h`, margin + 2, currentY);
  doc.text(`Tarif horaire: ${quote.hourlyRate}$ (${Math.round(quote.hourlyRate * 650)} FCFA)`, pageWidth / 2, currentY);
  currentY += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: ${quote.totalAmount} FCFA (${Math.round(quote.totalAmount / 650)}$)`, margin + 2, currentY);
  currentY += 20;

  // Conditions et mentions légales
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');

  currentY = addWrappedText(
    'CONDITIONS: Ce devis est valable 30 jours à compter de la date d\'émission. Le paiement s\'effectue en 3 tranches : 30% à la commande, 40% à mi-parcours, 30% à la livraison.',
    margin,
    currentY,
    pageWidth - 2 * margin,
    4
  );

  currentY += 15;

  // Pied de page
  const footerY = pageHeight - 30;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(8);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  centerText('Abdoulaye Diallo - Développeur Full Stack', footerY + 10);
  centerText('Email: abdallahuix.dev@gmail.com | Tél: +221 78 291 7770', footerY + 15);
  centerText(`Devis généré automatiquement le ${quote.createdAt.toLocaleDateString('fr-FR')}`, footerY + 20);

  // Générer le nom du fichier
  const fileName = `devis-${quote.clientName.toLowerCase().replace(/\s+/g, '-')}-${quote.id}.pdf`;

  // Télécharger le PDF
  doc.save(fileName);
};

export const generateQuotePDFBlob = (quote: GeneratedQuote): Blob => {
  const doc = new jsPDF();

  // Couleurs
  const primaryColor: [number, number, number] = [59, 130, 246]; // Bleu primaire
  const secondaryColor: [number, number, number] = [107, 114, 128]; // Gris

  // Configuration de la page
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let currentY = margin;

  // Fonction helper pour centrer le texte
  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Fonction helper pour ajouter du texte avec retour à la ligne
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], x, y + (i * lineHeight));
    }
    return y + (lines.length * lineHeight);
  };

  // En-tête avec logo/branding
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  centerText('DEVIS AUTOMATIQUE', 25, 16);
  centerText('Portfolio Abdoulaye Diallo', 35, 12);

  currentY = 60;

  // Informations du devis
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('DEVIS DE PRESTATION', margin, currentY);
  currentY += 15;

  // Numéro et date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Numéro: ${quote.id}`, margin, currentY);
  doc.text(`Date: ${quote.createdAt.toLocaleDateString('fr-FR')}`, pageWidth - margin - 60, currentY);
  currentY += 20;

  // Section Client
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 25, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Nom: ${quote.clientName}`, margin + 2, currentY);
  doc.text(`Email: ${quote.clientEmail}`, pageWidth / 2, currentY);
  currentY += 10;

  // Section Projet
  currentY += 10;
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 35, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROJET', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Type: ${quote.projectType}`, margin + 2, currentY);
  doc.text(`Délai: ${quote.timeline}`, pageWidth / 2, currentY);
  currentY += 10;
  currentY = addWrappedText(`Description: ${quote.description}`, margin + 2, currentY, pageWidth - 2 * margin - 4, 5);
  currentY += 10;

  // Fonctionnalités incluses
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 40, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FONCTIONNALITÉS INCLUSES', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  quote.features.forEach((feature, index) => {
    doc.text(`• ${feature}`, margin + 5, currentY + (index * 5));
  });
  currentY += quote.features.length * 5 + 15;

  // Estimation financière
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(margin, currentY - 5, pageWidth - 2 * margin, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ESTIMATION FINANCIÈRE', margin + 2, currentY + 5);

  currentY += 15;
  doc.setFontSize(11);
  doc.text(`Heures estimées: ${quote.estimatedHours}h`, margin + 2, currentY);
  doc.text(`Tarif horaire: ${quote.hourlyRate}$ (${Math.round(quote.hourlyRate * 650)} FCFA)`, pageWidth / 2, currentY);
  currentY += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: ${quote.totalAmount} FCFA (${Math.round(quote.totalAmount / 650)}$)`, margin + 2, currentY);
  currentY += 20;

  // Conditions
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  currentY = addWrappedText(
    'CONDITIONS: Ce devis est valable 30 jours. Paiement en 3 tranches.',
    margin,
    currentY,
    pageWidth - 2 * margin,
    4
  );

  // Pied de page
  const footerY = doc.internal.pageSize.height - 30;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(8);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  centerText('Abdoulaye Diallo - Développeur Full Stack', footerY + 10);
  centerText('Email: abdallahuix.dev@gmail.com | Tél: +221 78 291 7770', footerY + 15);

  // Retourner le blob du PDF
  return doc.output('blob');
};