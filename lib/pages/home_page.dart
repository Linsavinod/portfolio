import 'package:flutter/material.dart';
import '../widgets/header.dart';
import '../widgets/about_section.dart';
import '../widgets/contact_section.dart';
import '../widgets/projects_section.dart';
import '../widgets/skills_section.dart';

class HomePage extends StatelessWidget{
  const HomePage({super.key});


  @override 
  Widget build(BuildContext context){
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: const[
            Header(),
            AboutSection(),
            SkillsSection(),
            ProjectsSection(),
            ContactSection(),
      ],
      ),
    ),
    );
  }
 } 
