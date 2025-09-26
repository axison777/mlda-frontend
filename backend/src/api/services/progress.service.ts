import prisma from '@/lib/prisma';
import { LessonProgress, Prisma } from '@prisma/client';

// --- Service pour mettre à jour la progression d'une leçon ---
export const updateLessonProgress = async (
  studentId: string,
  lessonId: string,
  data: { completed: boolean; timeSpent?: number }
): Promise<LessonProgress> => {
  // 1. Mettre à jour ou créer la progression de la leçon
  const lessonProgress = await prisma.lessonProgress.upsert({
    where: {
      studentId_lessonId: { studentId, lessonId },
    },
    update: {
      completed: data.completed,
      timeSpent: {
        increment: data.timeSpent || 0,
      },
    },
    create: {
      completed: data.completed,
      timeSpent: data.timeSpent || 0,
      student: { connect: { id: studentId } },
      lesson: { connect: { id: lessonId } },
    },
    include: {
      lesson: {
        select: { courseId: true },
      },
    },
  });

  // 2. Recalculer et mettre à jour la progression globale du cours
  await updateOverallCourseProgress(studentId, lessonProgress.lesson.courseId);

  return lessonProgress;
};

// --- Fonction utilitaire pour mettre à jour la progression du cours ---
const updateOverallCourseProgress = async (studentId: string, courseId: string) => {
  // Compter le nombre total de leçons dans le cours
  const totalLessons = await prisma.lesson.count({
    where: { courseId },
  });

  if (totalLessons === 0) {
    return; // Éviter la division par zéro
  }

  // Compter le nombre de leçons terminées par l'étudiant dans ce cours
  const completedLessons = await prisma.lessonProgress.count({
    where: {
      studentId,
      lesson: {
        courseId,
      },
      completed: true,
    },
  });

  // Calculer le pourcentage de progression
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Mettre à jour l'inscription de l'étudiant avec le nouveau pourcentage
  await prisma.enrollment.update({
    where: {
      studentId_courseId: { studentId, courseId },
    },
    data: {
      progress: progressPercentage,
    },
  });
};

// --- Service pour récupérer la progression d'un étudiant pour un cours ---
export const getCourseProgress = async (studentId: string, courseId: string) => {
  const progress = await prisma.lessonProgress.findMany({
    where: {
      studentId,
      lesson: {
        courseId,
      },
    },
    select: {
      lessonId: true,
      completed: true,
    },
  });

  return progress;
};