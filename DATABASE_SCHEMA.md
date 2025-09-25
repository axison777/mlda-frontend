// Fichier : DATABASE_SCHEMA.md (représentant notre futur prisma/schema.prisma)

// Ce datasource configure la connexion à notre base de données MySQL.
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Ce generator indique à Prisma de créer un client TypeScript pour interagir avec la base de données.
generator client {
  provider = "prisma-client-js"
}

// --- Modèles de base ---

model User {
  id              String            @id @default(cuid())
  email           String            @unique
  password        String
  firstName       String
  lastName        String
  role            UserRole          @default(STUDENT)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  profile         Profile?
  taughtCourses   Course[]          @relation("TeacherCourses")
  enrollments     Enrollment[]
  progress        LessonProgress[]
  quizAttempts    QuizAttempt[]
  sentMessages    Message[]         @relation("SentMessages")
  receivedMessages Message[]        @relation("ReceivedMessages")
  achievements    UserAchievement[]
  payments        Payment[]
  announcements   Announcement[]
}

model Profile {
  id        String   @id @default(cuid())
  bio       String?  @db.Text
  avatarUrl String?
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
}

model Course {
  id          String    @id @default(cuid())
  title       String
  description String    @db.Text
  level       CourseLevel
  price       Float
  thumbnail   String?
  status      PublishStatus @default(DRAFT)
  featured    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  teacherId   String
  teacher     User      @relation("TeacherCourses", fields: [teacherId], references: [id])

  lessons     Lesson[]
  enrollments Enrollment[]
  announcements Announcement[]
  paymentItems PaymentItem[]
}

model Lesson {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  videoUrl  String?
  order     Int

  courseId  String
  course    Course   @relation(fields: [courseId], references: [id])

  progress  LessonProgress[]
  quiz      Quiz?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// --- Modèles de relations et de suivi ---

model Enrollment {
  id         String   @id @default(cuid())
  enrolledAt DateTime @default(now())
  progress   Float    @default(0) // Pourcentage de complétion

  studentId  String
  student    User     @relation(fields: [studentId], references: [id])

  courseId   String
  course     Course   @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId])
}

model LessonProgress {
  id          String   @id @default(cuid())
  completed   Boolean  @default(false)
  timeSpent   Int      @default(0) // en secondes

  studentId   String
  student     User     @relation(fields: [studentId], references: [id])

  lessonId    String
  lesson      Lesson   @relation(fields: [lessonId], references: [id])

  @@unique([studentId, lessonId])
}

// --- Modèles pour les Quiz ---

model Quiz {
  id      String   @id @default(cuid())
  title   String

  lessonId String   @unique
  lesson   Lesson   @relation(fields: [lessonId], references: [id])

  questions Question[]
  attempts  QuizAttempt[]
}

model Question {
  id      String    @id @default(cuid())
  text    String

  quizId  String
  quiz    Quiz      @relation(fields: [quizId], references: [id])

  choices Choice[]
  answers Answer[]
}

model Choice {
  id        String    @id @default(cuid())
  text      String
  isCorrect Boolean

  questionId String
  question   Question  @relation(fields: [questionId], references: [id])

  answers    Answer[]
}

model QuizAttempt {
  id          String   @id @default(cuid())
  score       Float
  timeSpent   Int // en secondes
  submittedAt DateTime @default(now())

  studentId   String
  student     User     @relation(fields: [studentId], references: [id])

  quizId      String
  quiz        Quiz     @relation(fields: [quizId], references: [id])

  answers     Answer[]
}

model Answer {
  id          String   @id @default(cuid())

  attemptId   String
  attempt     QuizAttempt @relation(fields: [attemptId], references: [id])

  questionId  String
  question    Question @relation(fields: [questionId], references: [id])

  choiceId    String
  choice      Choice   @relation(fields: [choiceId], references: [id])

  @@unique([attemptId, questionId])
}

// --- Modèles pour la boutique et les paiements ---

model Product {
  id          String   @id @default(cuid())
  name        String
  description String   @db.Text
  price       Float
  imageUrl    String?
  category    String
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  paymentItems PaymentItem[]
}

model Payment {
  id            String    @id @default(cuid())
  amount        Float
  currency      String    @default("XOF")
  status        PaymentStatus @default(PENDING)
  provider      String // "stripe", "paypal", etc.
  transactionId String?
  createdAt     DateTime  @default(now())

  userId        String
  user          User      @relation(fields: [userId], references: [id])

  items         PaymentItem[]
}

model PaymentItem {
    id        String   @id @default(cuid())
    quantity  Int
    price     Float // Prix au moment de l'achat

    paymentId String
    payment   Payment @relation(fields: [paymentId], references: [id])

    productId String?
    product   Product? @relation(fields: [productId], references: [id])

    courseId  String?
    course    Course?  @relation(fields: [courseId], references: [id])
}


// --- Modèles pour la communication et la gamification ---

model Announcement {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  createdAt DateTime @default(now())

  authorId  String
  author    User     @relation(fields: [authorId], references: [id])

  courseId  String?
  course    Course?  @relation(fields: [courseId], references: [id])
}

model Message {
  id          String   @id @default(cuid())
  content     String   @db.Text
  read        Boolean  @default(false)
  createdAt   DateTime @default(now())

  senderId    String
  sender      User     @relation("SentMessages", fields: [senderId], references: [id])

  recipientId String
  recipient   User     @relation("ReceivedMessages", fields: [recipientId], references: [id])
}

model Achievement {
  id           String    @id @default(cuid())
  name         String
  description  String
  iconUrl      String?

  users        UserAchievement[]
}

model UserAchievement {
  id            String      @id @default(cuid())
  earnedAt      DateTime    @default(now())

  userId        String
  user          User        @relation(fields: [userId], references: [id])

  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id])

  @@unique([userId, achievementId])
}

model Campaign {
    id        String   @id @default(cuid())
    name      String
    startDate DateTime
    endDate   DateTime
    budget    Float
    status    CampaignStatus @default(ACTIVE)
}


// --- Enums (Types de données personnalisés) ---

enum UserRole {
  ADMIN
  TEACHER
  STUDENT
}

enum CourseLevel {
  A1
  A2
  B1
  B2
  C1
  C2
}

enum PublishStatus {
  DRAFT
  PUBLISHED
}

enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
}

enum CampaignStatus {
    ACTIVE
    PAUSED
    ENDED
}