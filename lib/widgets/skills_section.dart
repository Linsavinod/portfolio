import 'package:flutter/material.dart';
  class SkillsSection extends StatelessWidget {
    const SkillsSection ({super.key});

    final List<String>skills = const <String>[
      'Flutter',
      'C',
      'C++',
      'Python',
      'HTML',
    ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Skills',
            style: TextStyle(fontSize: 28,fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing:16,
            runSpacing:12,
            children: skills
            .map((skill) => Chip(
              label: Text(skill),
              backgroundColor: Colors.blueGrey.shade700,
              labelStyle: const TextStyle(color: Colors.white),
              ))
              .toList(),
          )
        ],
    ),
      );
  }
}