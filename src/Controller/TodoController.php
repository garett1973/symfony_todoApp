<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/todo', name: 'todo')]
class TodoController extends AbstractController
{

    private EntityManagerInterface $em;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $em, TodoRepository $todoRepository) {

        $this->em = $em;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'todo_read')]
    public function read(): Response
    {
        $todos = $this->todoRepository->findAll();
        $allTodos = [];
        foreach ($todos as $todo) {
            $allTodos[] = $todo->toArray();
        }
        return $this->json($allTodos);
    }

    #[Route('/create', name: 'todo_create')]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();
        $todo->setTask($content->task);
        $todo->setIsCompleted($content->isCompleted);
        try {
            $this->em->persist($todo);
            $this->em->flush();

            return $this->json([
                'todo' => $todo->toArray()
            ]);
        } catch (Exception $exception) {
            // todo: implement error message
        }
    }
}
