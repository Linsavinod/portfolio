import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import '../widgets/project_card.dart';

class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

@override
 Widget build(BuildContext context) {
  return Container(
    padding: const EdgeInsets.all(32),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Projects',
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ProjectCard(
            title: 'Expense Tracker',
            description: 'An expense tracker app built with Flutter, Hive, and Provider to manage daily spending easily.',
            tech: 'Flutter, Hive, Provider',
            github: 'https://github.com/Linsavinod/expense_tracker.git'
          ),
          
      ],
    ),
  );
 
  }
}
